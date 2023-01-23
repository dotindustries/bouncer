import { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@dotinc/bouncer-db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { Base64URLString } from "@simplewebauthn/typescript-types";
import { z } from "zod";
import base64url from "base64url";

const authenticationResponse = z.object({
  id: z.custom<Base64URLString>(),
  rawId: z.custom<Base64URLString>(),
  type: z.custom<PublicKeyCredentialType>(),
  clientDataJSON: z.custom<Base64URLString>(),
  authenticatorData: z.custom<Base64URLString>(),
  signature: z.custom<Base64URLString>(),
  userHandle: z.string(),
});

export const authOptions = ({
  domain,
  origin,
}: {
  domain: string;
  origin: string;
}): NextAuthOptions => ({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "webauthn",
      credentials: {},
      async authorize(cred, req) {
        const {
          id,
          rawId,
          type,
          clientDataJSON,
          authenticatorData,
          signature,
          userHandle,
        } = authenticationResponse.parse(req.body);

        const credential = {
          id,
          rawId,
          type,
          response: {
            clientDataJSON,
            authenticatorData,
            signature,
            userHandle,
          },
        };
        const authenticator = await prisma.credential.findFirst({
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
          where: {
            id: credential.id,
          },
        });
        if (!authenticator) {
          return null;
        }
        const challenge = await prisma.credentialChallenge.findFirst({
          where: { userId: authenticator.user.email! },
        });
        if (!challenge) {
          return null;
        }
        try {
          const { verified, authenticationInfo: info } =
            await verifyAuthenticationResponse({
              response: credential as any,
              expectedChallenge: challenge.value,
              expectedOrigin: origin,
              expectedRPID: domain,
              authenticator: {
                credentialPublicKey: authenticator.publicKey,
                credentialID: base64url.toBuffer(authenticator.id),
                counter: authenticator.signCount,
              },
              requireUserVerification: true,
            });

          if (!verified || !info) {
            return null;
          }
          await prisma.credential.update({
            data: {
              signCount: info.newCounter,
            },
            where: {
              id: authenticator.id,
            },
          });
        } catch (err) {
          console.log(err);
          return null;
        }

        return {
          id: authenticator.userId,
          email: authenticator.user.email,
          // undefined cannot be serialized
          // api:dev: error - SerializableError: Error serializing `.session.user.name` returned from `getServerSideProps` in "/".
          // api:dev: Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
          name: null,
          image: null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session({ session, user, token }) {
      if (!session.user) {
        return session;
      }

      let userId = user ? user.id : token.sub;

      if (userId) {
        session.user.id = userId;
      }

      return session;
    },
  },
});

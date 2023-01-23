import { NextApiRequest, NextApiResponse } from "next";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { z } from "zod";
import type { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import { getServerSession } from "../get-session";
import { AuthenticatorTransport, prisma } from "@dotinc/bouncer-db";

const registrationSchema = z.custom<RegistrationResponseJSON>();

/**
 * handles GET /api/auth/webauthn/register.
 *
 * This function generates and returns registration options.
 */
const handlePreRegister =
  (domain: string, origin: string, appName: string) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession({ req, res });
    const email = session?.user?.email;
    if (!email) {
      return res.status(401).json({ message: "Authentication is required" });
    }

    const credentials = await prisma.credential.findMany({
      include: {
        transports: {
          select: {
            transport: true,
          },
        },
      },
      where: {
        user: {
          email,
        },
      },
    });

    const options = generateRegistrationOptions({
      rpID: domain,
      rpName: appName,
      userID: session.user.id,
      userName: email,
      attestationType: "none",
      authenticatorSelection: {
        userVerification: "preferred",
      },
    });
    options.excludeCredentials = credentials.map((c) => ({
      id: c.id,
      type: "public-key",
      transports: c.transports.map((t) => t.transport),
    }));

    try {
      await prisma.credentialChallenge.upsert({
        create: { userId: email, value: options.challenge },
        update: { value: options.challenge },
        where: { userId: email },
      });
    } catch (err) {
      return res.status(500).json({ message: "Could not set up challenge." });
    }
    return res.status(200).json(options);
  };

/**
 * handles POST /api/auth/webauthn/register.
 *
 * This function verifies and stores user's public key.
 */
const handleRegister =
  (domain: string, origin: string, appName: string) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession({ req, res });
    const email = session?.user?.email;
    if (!email) {
      return res
        .status(401)
        .json({ success: false, message: "You are not connected." });
    }
    const challenge = await prisma.credentialChallenge.findFirst({
      where: { userId: email },
    });

    if (!challenge) {
      return res
        .status(401)
        .json({ success: false, message: "Pre-registration is required." });
    }

    const credential = registrationSchema.parse(req.body);

    const { verified, registrationInfo: info } =
      await verifyRegistrationResponse({
        response: credential,
        expectedRPID: domain,
        expectedOrigin: origin,
        expectedChallenge: challenge.value,
        requireUserVerification: true,
      });
    if (!verified || !info) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
    try {
      await prisma.credential.create({
        data: {
          id: credential.id,
          publicKey: Buffer.from(info.credentialPublicKey),
          signCount: info.counter,
          userId: session.user.id,
          transports: {
            createMany: {
              data: credential.response.transports?.map((t) => ({
                transport: t,
              })) ?? [{ transport: AuthenticatorTransport.internal }],
            },
          },
        },
      });
      return res.status(201).json({ success: true });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Could not register the credential.",
      });
    }
  };

export const WebauthnRegister =
  ({
    domain,
    origin,
    appName,
  }: {
    domain: string;
    origin: string;
    appName: string;
  }) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      return handlePreRegister(domain, origin, appName)(req, res);
    }
    if (req.method === "POST") {
      return handleRegister(domain, origin, appName)(req, res);
    }
    return res.status(404).json({ message: "Forbidden method." });
  };

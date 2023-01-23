import { NextApiRequest, NextApiResponse } from "next";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { prisma } from "@dotinc/bouncer-db";

/**
 * handles GET /api/auth/webauthn/authenticate.
 *
 * It generates and returns authentication options.
 */
export const WebauthnAuthenticate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const email = req.query["email"] as string;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const credentials = await prisma.credential.findMany({
      include: { transports: true },
      where: { user: { email } },
    });

    const options = generateAuthenticationOptions({
      userVerification: "preferred",
    });

    options.allowCredentials = credentials.map((c) => ({
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
  }
  return res.status(404).json({ message: "The method is forbidden." });
};

import { prisma } from "@dotinc/bouncer-db";
import { WebauthnAuthenticate } from "@dotinc/bouncer-auth/src/server";

export default WebauthnAuthenticate({ repo: prisma });

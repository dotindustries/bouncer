import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "./auth-options";

const origin = process.env.NEXTAUTH_URL!;

const domain = origin.replace(/(http|https):\/\//g, "").replace(":3000", "");

export const getServerSession = async (
  ctx:
    | {
        req: GetServerSidePropsContext["req"];
        res: GetServerSidePropsContext["res"];
      }
    | { req: NextApiRequest; res: NextApiResponse }
) => {
  return await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions({ domain, origin })
  );
};

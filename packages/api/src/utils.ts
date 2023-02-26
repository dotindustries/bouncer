import micromatch from "micromatch";
import { env } from "./env.mjs";

export const validateEmailWithACL = (email: string) => {
  const authAcl = env.AUTH_ACL || undefined;

  if (!authAcl) {
    return false;
  }

  const acl = authAcl.split(",");

  return micromatch.isMatch(email, acl);
};

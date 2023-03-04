export { RegisterWebAuthn } from "./src/RegisterWebAuthn";

export type { Session } from "next-auth";
export { signIn, signOut, useSession } from "next-auth/react";

export {
  startAuthentication,
  startRegistration,
  browserSupportsWebAuthnAutofill,
  platformAuthenticatorIsAvailable,
  browserSupportsWebAuthn,
} from "@simplewebauthn/browser";

export type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";

import { DefaultSession } from "next-auth";
/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

export type User = {
  id: string;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

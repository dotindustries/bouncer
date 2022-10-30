import * as React from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "../config/frontend";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};

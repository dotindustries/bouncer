import * as React from "react";
import { SuperTokensWrapper } from "supertokens-auth-react";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};

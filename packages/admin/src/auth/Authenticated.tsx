import { SessionAuth } from "supertokens-auth-react/recipe/session";

export const Authenticated: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <SessionAuth>{children}</SessionAuth>;
};

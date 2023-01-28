import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export const AuthProvider = ({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

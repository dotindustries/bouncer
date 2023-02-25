import * as React from "react";
import { AppShell } from "@dotinc/bouncer-ui";
import { NavBar } from "./Navbar";
import { useSession } from "@dotinc/bouncer-auth";

export const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const session = useSession();

  const isLoading = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";

  const navbar = isLoading ? null : isAuthenticated ? <NavBar /> : null;

  return <AppShell navbar={navbar}>{props.children}</AppShell>;
};

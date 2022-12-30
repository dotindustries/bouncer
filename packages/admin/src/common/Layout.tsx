import * as React from "react";
import { AppShell } from "@saas-ui/react";
import { NavBar } from "./Navbar";

export const Layout: React.FC<React.PropsWithChildren> = (props) => {
  return <AppShell navbar={<NavBar />}>{props.children}</AppShell>;
};

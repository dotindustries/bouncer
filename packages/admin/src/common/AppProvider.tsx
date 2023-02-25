import * as React from "react";
import {
  ModalsProvider,
  SaasProvider,
  Form,
  LinkProps,
} from "@dotinc/bouncer-ui";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";

const LinkComponent = (props: LinkProps) => {
  return (
    <Link href={props.href as any} legacyBehavior>
      {props.children}
    </Link>
  );
};

export const queryClient = new QueryClient();

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SaasProvider linkComponent={LinkComponent}>
        <ModalsProvider>{children}</ModalsProvider>
      </SaasProvider>
    </QueryClientProvider>
  );
};

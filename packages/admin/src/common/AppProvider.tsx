import * as React from "react";
import { ModalsProvider, SaasProvider, Form } from "@dotinc/bouncer-ui";

import { AuthProvider } from "../auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SaasProvider>
        <ModalsProvider>
          <AuthProvider>{children}</AuthProvider>
        </ModalsProvider>
      </SaasProvider>
    </QueryClientProvider>
  );
};

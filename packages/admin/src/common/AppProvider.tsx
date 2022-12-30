import * as React from "react";
import { SaasProvider } from "@saas-ui/react";
import { AuthProvider } from "../auth/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SaasProvider>
        <AuthProvider>{children}</AuthProvider>
      </SaasProvider>
    </QueryClientProvider>
  );
};

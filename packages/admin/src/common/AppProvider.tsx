import * as React from "react";
import { ModalsProvider, SaasProvider, Form } from "@dotinc/bouncer-ui";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SaasProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </SaasProvider>
    </QueryClientProvider>
  );
};

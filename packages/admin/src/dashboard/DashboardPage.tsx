import { RegisterWebAuthn, useSession } from "@dotinc/bouncer-auth";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Loader,
  useModals,
} from "@dotinc/bouncer-ui";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AddProductDialog } from "../products/AddProductDialog";
import { api } from "../utils/api";

export const DashboardPage = () => {
  const modals = useModals();
  const session = useSession({ required: true });
  const router = useRouter();

  const products = api.products.all.useQuery(undefined, {
    enabled: !!session.data,
  });

  useEffect(() => {
    console.log(session, products);
    if (
      session.status === "authenticated" &&
      products.isFetched &&
      products.data?.length
    ) {
      router.push(`/${products.data[0].id}`);
    }
  }, [session]);

  if (session.status === "loading") {
    return <Loader />;
  }

  return (
    <Box px="8" py="4">
      <HStack mb="4">
        <Heading flex="1" size="md">
          Dashboard
        </Heading>
        <Button variant="primary" onClick={() => modals.open(AddProductDialog)}>
          Add product
        </Button>
      </HStack>

      <RegisterWebAuthn />
    </Box>
  );
};

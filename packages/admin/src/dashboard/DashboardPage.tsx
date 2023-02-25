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
import { AddProductDialog } from "../products/AddProductDialog";

export const DashboardPage = () => {
  const modals = useModals();
  const session = useSession({ required: true });

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

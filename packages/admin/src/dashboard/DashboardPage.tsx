import { RegisterWebAuthn, useSession } from "@dotinc/bouncer-auth";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  useModals,
} from "@dotinc/bouncer-ui";
import { AddProductDialog } from "../products/AddProductDialog";

export const DashboardPage = () => {
  const modals = useModals();
  const sess = useSession();

  return (
    <Box px="8" py="4">
      <HStack>
        <Heading flex="1">Dashboard</Heading>
        <Button variant="primary" onClick={() => modals.open(AddProductDialog)}>
          Add product
        </Button>
      </HStack>

      <RegisterWebAuthn />

      <Card>
        <pre>{JSON.stringify(sess, null, "  ")}</pre>
      </Card>
    </Box>
  );
};

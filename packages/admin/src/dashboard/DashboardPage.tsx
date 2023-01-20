import { Box, Button, Heading, HStack, useModals } from "@dotinc/bouncer-ui";
import { AddProductDialog } from "../products/AddProductDialog";

export const DashboardPage = () => {
  const modals = useModals();

  return (
    <Box px="8" py="4">
      <HStack>
        <Heading flex="1">Dashboard</Heading>
        <Button variant="primary" onClick={() => modals.open(AddProductDialog)}>
          Add product
        </Button>
      </HStack>
    </Box>
  );
};

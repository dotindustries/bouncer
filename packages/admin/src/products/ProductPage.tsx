import { Box, Button, Heading, HStack } from "@dotinc/bouncer-ui";
import { DevPortalButton } from "src/dashboard/DevPortal";
import { api } from "src/utils/api";
import { AppPortal } from "svix-react";

import "svix-react/style.css";

const SvixEmbed = ({ svixAppId }: { svixAppId: string }) => {
  const { data: appPortal, status } = api.admin.eventPortal.useQuery({
    productId: svixAppId,
  });
  if (status === "loading") {
    return null;
  }
  return <AppPortal url={appPortal?.url} />;
};

export const ProductPage = ({ productId }: { productId: string }) => {
  return (
    <Box px="8" py="4">
      <HStack>
        <Heading flex="1">Product</Heading>
        <Button variant="primary">Add subscription</Button>
        <DevPortalButton />
      </HStack>

      <SvixEmbed svixAppId={productId} />
    </Box>
  );
};

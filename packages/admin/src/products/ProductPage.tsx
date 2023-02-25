import { Box, Button, Heading, HStack, Loader } from "@dotinc/bouncer-ui";
import { EditProductForm } from "./EditProductForm";
import { api } from "../utils/api";
// import { AppPortal } from "svix-react";

// const SvixEmbed = ({ svixAppId }: { svixAppId: string }) => {
//   const { data: appPortal, status } = api.admin.eventPortal.useQuery({
//     productId: svixAppId,
//   });
//   if (status === "loading") {
//     return null;
//   }
//   return <AppPortal url={appPortal?.url} />;
// };

export const ProductPage = ({ productId }: { productId: string }) => {
  const {
    data: product,
    isLoading,
    status,
  } = api.products.byId.useQuery({
    productId,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box px="8" py="4">
      <HStack>
        <Heading flex="1">Product</Heading>
        <Button variant="primary">Add subscription</Button>
      </HStack>

      {/* <SvixEmbed svixAppId={productId} /> */}

      <EditProductForm product={product} />
    </Box>
  );
};

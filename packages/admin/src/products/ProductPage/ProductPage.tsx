import {
  Box,
  Button,
  Heading,
  HStack,
  Loader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@dotinc/bouncer-ui";
import { EditProductForm } from "./EditProductForm";
import { DevPortalButton } from "../../dashboard/DevPortal";
import { api } from "../../utils/api";
import { env } from "../../env.mjs";
import { ProductWebhooks } from "./Webhooks";

export const ProductPage = ({ productId }: { productId: string }) => {
  const {
    data: product,
    isLoading,
    status,
  } = api.products.byId.useQuery({
    productId,
  });

  if (isLoading || !product) {
    return <Loader />;
  }

  return (
    <Box px="8" py="4">
      <HStack>
        <Heading flex="1" size="md">
          {product.product_name}
        </Heading>
        <Button variant="primary">Add subscription</Button>
        {/* Only show dev portal button if set up is complete */}
        {env.NEXT_PUBLIC_SPEAKEASY_DEV_PORTAL_DOMAIN && (
          <DevPortalButton productId={product.id} />
        )}
      </HStack>

      <Box py="4">
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Edit</Tab>
            <Tab>Webhooks</Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel>
              <EditProductForm product={product} />
            </TabPanel>
            <TabPanel>
              <ProductWebhooks product={product} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

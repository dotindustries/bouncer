import { Box, Button, Heading, HStack } from "@dotinc/bouncer-ui";
import * as React from "react";
import { api } from "../utils/api";

export const ListProductsPage = () => {
  const [count, setCount] = React.useState(1);
  const ctx = api.useContext();

  const invalidate = ctx.products.all.invalidate;
  const {
    data: publisherConfigurations,
    error,
    isLoading,
  } = api.products.all.useQuery();

  return (
    <Box px="8" py="4">
      <HStack>
        <Heading>Products</Heading>
      </HStack>

      {publisherConfigurations?.map((productConfig) => (
        <div key={productConfig.id}>
          <pre>{JSON.stringify(productConfig, null, "  ")}</pre>
        </div>
      ))}
    </Box>
  );
};

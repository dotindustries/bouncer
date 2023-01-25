import { Box, Button, Heading, HStack } from "@dotinc/bouncer-ui";
import * as React from "react";
import { products } from "../api";

export const ListPublishersPage = () => {
  const [count, setCount] = React.useState(1);
  const {
    data: publisherConfigurations,
    error,
    isLoading,
    invalidate,
  } = products.useProducts();

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

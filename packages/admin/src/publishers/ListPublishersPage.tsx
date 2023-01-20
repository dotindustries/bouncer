import { Box, Button, Heading, HStack } from "@dotinc/bouncer-ui";
import * as React from "react";
import { config, seats } from "../api";

export const ListPublishersPage = () => {
  const [count, setCount] = React.useState(1);
  const {
    data: publisherConfigurations,
    error,
    isLoading,
    invalidate,
  } = config.usePublisherConfigurations();

  return (
    <Box px="8" py="4">
      <HStack>
        <Heading>Publishers</Heading>
      </HStack>

      {publisherConfigurations?.map((publisherConfig) => (
        <div key={publisherConfig.id}>
          <pre>{JSON.stringify(publisherConfig, null, "  ")}</pre>
        </div>
      ))}
    </Box>
  );
};

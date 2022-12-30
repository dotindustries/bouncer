import { Box, Button } from "@chakra-ui/react";
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

  const { mutate } = seats.useRequestSeat(
    {
      params: {
        subscriptionId: "<your subscription id>",
        seatId: "<your seat id>",
      },
    },
    {
      onSuccess: () => invalidate(),
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <>
        <h2>Error</h2>
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, "  ")}</pre>
      </>
    );
  }

  return (
    <Box>
      <Button
        onClick={() => {
          mutate({
            tenant_id: `tenant${count}`,
            user_id: `${count}`,
            user_name: `user${count}`,
            email: `user${count}@test.com`,
          });
        }}
      >
        Add User
      </Button>
      {publisherConfigurations?.map((publisherConfig) => (
        <div key={publisherConfig.id}>
          <pre>{JSON.stringify(publisherConfig, null, "  ")}</pre>
        </div>
      ))}
    </Box>
  );
};

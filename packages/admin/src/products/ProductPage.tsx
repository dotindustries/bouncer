import { useSession } from "@dotinc/bouncer-auth";
import { Box, Button, Heading, HStack } from "@dotinc/bouncer-ui";
import { useEffect, useState } from "react";
import { AppPortal } from "svix-react";

import "svix-react/style.css";

const SvixEmbed = () => {
  const [appPortal, setAppPortal] = useState<{ url: string } | null>(null);
  const sess = useSession();
  if (sess.status !== "authenticated") {
    return null;
  }
  const svixAppId = "app_x"; // this might vary from customer to customer

  useEffect(() => {
    // Prerequisite: You'll need an endpoint that returns the App Portal
    // magic URL (https://api.svix.com/docs#operation/get_dashboard_access_api_v1_auth_dashboard_access__app_id___post)
    fetch(`/your-backend-service/svix/${svixAppId}/app-portal`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => setAppPortal(result));
  }, [svixAppId]);

  return <AppPortal url={appPortal?.url} />;
};

export const ProductPage = () => {
  return (
    <Box px="8" py="4">
      <HStack>
        <Heading flex="1">Product</Heading>
        <Button variant="primary">Add subscription</Button>
      </HStack>

      <SvixEmbed />
    </Box>
  );
};

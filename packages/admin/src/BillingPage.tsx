import { Box, Button } from "@dotinc/bouncer-ui";
import { useRouter } from "next/router";

export const BillingPage = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const returnTo = router.asPath;
  const billingHref = `/api/portal/${productId}?returnTo=${returnTo}`;
  const openBillingPortal = () => {
    router.push(billingHref);
  };
  return (
    <Box>
      <Button onClick={openBillingPortal}>Open billing portal</Button>
    </Box>
  );
};

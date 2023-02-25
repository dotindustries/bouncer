import { Box, Button, Heading, HStack, Loader } from "@dotinc/bouncer-ui";
import dynamic from "next/dynamic";
import { EditProductForm } from "./EditProductForm";
import { DevPortalButton } from "../dashboard/DevPortal";
import { api } from "../utils/api";
import { memo, useMemo, useState } from "react";
import { useAsyncMemo } from "../utils/use-async-memo";

const useSvixPortalToken = (productId: string) => {
  const apiCtx = api.useContext();
  const [loading, setLoading] = useState(true);

  const appPortal = useAsyncMemo(async () => {
    setLoading(true);
    const out = await apiCtx.admin.eventPortal.fetch({ productId });
    setLoading(false);
    return out;
  }, [productId]);

  return { appPortal, loading };
};

const SvixEmbedComponent = ({ svixAppId }: { svixAppId: string }) => {
  const { appPortal, loading } = useSvixPortalToken(svixAppId);

  return <AppPortal fullSize darkMode url={appPortal?.url} />;
};

const SvixEmbed = memo(SvixEmbedComponent);

const AppPortal = dynamic(
  {
    loader: () => import("svix-react").then((mod) => mod.AppPortal),
  },
  {
    ssr: false,
  }
);

export const ProductPage = ({ productId }: { productId: string }) => {
  const {
    data: product,
    isLoading,
    status,
  } = api.products.byId.useQuery({
    productId,
  });

  const { mutate: createEventTypes, isLoading: isCreatingEventTypes } =
    api.admin.setUpEventTypes.useMutation();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box px="8" py="4">
      <HStack>
        <Heading flex="1">{product?.product_name}</Heading>
        <Button variant="primary">Add subscription</Button>
        <DevPortalButton />
      </HStack>

      <Box py="4">
        <Button
          isLoading={isCreatingEventTypes}
          onClick={() => createEventTypes()}
        >
          create event types
        </Button>
        <Heading size="md">Webhooks</Heading>
        <SvixEmbed svixAppId={productId} />
      </Box>

      {/* <EditProductForm product={product} /> */}
    </Box>
  );
};

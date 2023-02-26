import { Box, Button, Heading } from "@dotinc/bouncer-ui";
import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { api } from "../../utils/api";
import { useAsyncMemo } from "../../utils/use-async-memo";

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

export const ProductWebhooks = ({ product }: any) => {
  const { mutate: createEventTypes, isLoading: isCreatingEventTypes } =
    api.admin.setUpEventTypes.useMutation();

  return (
    <Box>
      <Button
        isLoading={isCreatingEventTypes}
        onClick={() => createEventTypes()}
      >
        create event types
      </Button>

      <SvixEmbed svixAppId={product.id} />
    </Box>
  );
};

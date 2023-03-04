import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@dotinc/bouncer-ui";
import { api, RouterInputs } from "../utils/api";
import { env } from "../env.mjs";

const useRedirectUrl = (callbackUrl: string, productId: string) => {
  const { data: token } = api.admin.speakeasyPortalLoginToken.useQuery({
    productId,
  });
  const [target, setTarget] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const newTarget = new URL(callbackUrl);
    newTarget.searchParams.set("speakeasyAccessToken", token);
    setTarget(newTarget.toString());
  }, [token]);

  return target;
};

export const SpeakeasyLoginRedirect = () => {
  // TODO: add product selector before starting redirect
  const router = useRouter();
  let { callbackUrl } = router.query;

  if (!callbackUrl || Array.isArray(callbackUrl)) {
    callbackUrl = "";
  }

  const host = new URL(callbackUrl)?.host ?? "";
  if (
    env.NEXT_PUBLIC_SPEAKEASY_DEV_PORTAL_DOMAIN &&
    host.endsWith(env.NEXT_PUBLIC_SPEAKEASY_DEV_PORTAL_DOMAIN)
  ) {
  }
  const redirectUrl = useRedirectUrl(callbackUrl, "productId");

  useEffect(() => {
    // When a callbackUrl is supplied, attempt a redirect.
    if (redirectUrl) {
      window.location.replace(redirectUrl);
    }

    router.query;
  }, [redirectUrl]);

  return <></>;
};

type GetSpeakeasyPortalLoginTokenInput =
  RouterInputs["admin"]["speakeasyPortalLoginToken"];

const getRedirectUrl = async (
  getSpeakeasyPortalLoginToken: (
    input: GetSpeakeasyPortalLoginTokenInput,
    opts?: any
  ) => Promise<string | undefined>,
  callbackUrl: string,
  productId: string
) => {
  if (!env.NEXT_PUBLIC_SPEAKEASY_DEV_PORTAL_DOMAIN) {
    console.warn("NEXT_PUBLIC_SPEAKEASY_DEV_PORTAL_DOMAIN env var is not set");
    return ""; // nothing to do
  }

  const host = new URL(callbackUrl).host;
  if (host.endsWith(env.NEXT_PUBLIC_SPEAKEASY_DEV_PORTAL_DOMAIN)) {
    try {
      const token = await getSpeakeasyPortalLoginToken({
        productId,
      });
      if (!token) {
        return "";
      }
      const target = new URL(callbackUrl);
      target.searchParams.set("speakeasyAccessToken", token);
      return target;
    } catch (error) {
      console.warn(
        "There was a problem redirecting to the callback URL.",
        error
      );
    }
  }
  return "";
};

export const DevPortalButton = ({ productId }: { productId: string }) => {
  const apiCtx = api.useContext();
  const openDevPortal = async () => {
    const url = await getRedirectUrl(
      apiCtx.admin.speakeasyPortalLoginToken.fetch,
      `https://${env.NEXT_PUBLIC_SPEAKEASY_DEV_PORTAL_DOMAIN}`,
      productId
    );
    if (url) {
      window.open(url, "_blank");
    }
  };
  return (
    <Button variant="primary" onClick={openDevPortal}>
      Developer Portal
    </Button>
  );
};

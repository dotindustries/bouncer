import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api, RouterInputs } from "../utils/api";
import { Button } from "@dotinc/bouncer-ui";

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
  // if (host.endsWith("your-company-name.portal.speakeasyapi.dev")) {
  // }
  const searchParams = useSearchParams();
  const [internalSearchParams, setInternalSearchParams] = useState(
    new URLSearchParams(searchParams)
  );

  let callbackUrl: string;
  if (internalSearchParams.has("callbackUrl")) {
    callbackUrl = internalSearchParams.get("callbackUrl")!!;
  } else {
    callbackUrl = "";
  }

  const redirectUrl = useRedirectUrl(callbackUrl, "productId");

  useEffect(() => {
    // When a callbackUrl is supplied, attempt a redirect.
    if (redirectUrl) {
      window.location.replace(redirectUrl);
    }

    internalSearchParams.delete("callbackUrl");
    setInternalSearchParams(internalSearchParams);
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
  const host = new URL(callbackUrl).host;
  if (host.endsWith("usher.portal.speakeasyapi.dev")) {
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

export const DevPortalButton = () => {
  const apiCtx = api.useContext();
  const openDevPortal = async () => {
    const url = await getRedirectUrl(
      apiCtx.admin.speakeasyPortalLoginToken.fetch,
      "https://usher.portal.speakeasyapi.dev",
      "productId"
    );
    if (url) {
      window.location.replace(url);
    }
  };
  return (
    <Button variant="primary" onClick={openDevPortal}>
      Developer Portal
    </Button>
  );
};

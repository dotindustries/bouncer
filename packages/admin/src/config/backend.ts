import PasswordlessNode from "supertokens-node/recipe/passwordless";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo as defaultAppInfo } from "./appInfo";
import { AppInfo, SuperTokensInfo, TypeInput } from "supertokens-node/types";

export type BackendConfigProps = {
  supertokens?: SuperTokensInfo;
  appInfo?: Partial<AppInfo>;
};

export const backendConfig = (config: BackendConfigProps = {}): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: "https://try.supertokens.com",
      ...config.supertokens,
    },
    appInfo: {
      ...defaultAppInfo,
      ...config.appInfo,
    },
    recipeList: [
      PasswordlessNode.init({
        flowType: "MAGIC_LINK",
        contactMethod: "EMAIL",
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};

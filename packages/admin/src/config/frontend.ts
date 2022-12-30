import PasswordlessReact from "supertokens-auth-react/recipe/passwordless";
import SessionReact from "supertokens-auth-react/recipe/session";
import type { AppInfo } from "supertokens-node/types";
import { appInfo as defaultAppInfo } from "./appInfo";

export type FrontendConfigProps = {
  appInfo?: Partial<AppInfo>;
};

export const frontendConfig = (config: FrontendConfigProps = {}) => {
  return {
    appInfo: {
      ...defaultAppInfo,
      ...config.appInfo,
    },
    recipeList: [
      PasswordlessReact.init({
        contactMethod: "EMAIL",
      }),
      SessionReact.init(),
    ],
  };
};

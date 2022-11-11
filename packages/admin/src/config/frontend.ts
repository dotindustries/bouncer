import { AppInfo } from "node_modules/supertokens-node/types";
import PasswordlessReact from "supertokens-auth-react/recipe/passwordless";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo as defaultAppInfo } from "./appInfo";

export type FrontendConfigProps = {
  appInfo?: AppInfo;
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

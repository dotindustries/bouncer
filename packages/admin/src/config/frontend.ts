import PasswordlessReact from "supertokens-auth-react/recipe/passwordless";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      PasswordlessReact.init({
        contactMethod: "EMAIL",
      }),
      SessionReact.init(),
    ],
  };
};

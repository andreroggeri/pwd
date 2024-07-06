import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword/index.js";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui.js";
import Session from "supertokens-auth-react/recipe/session/index.js";
import ThirdPartyReact from "supertokens-auth-react/recipe/thirdparty/index.js";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui.js";
import { appInfo } from "./appInfo";

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init(),
      ThirdPartyReact.init({
        signInAndUpFeature: {
          providers: [
            // TODO: Enable later
            // ThirdPartyReact.Google.init(),
            ThirdPartyReact.Github.init(),
          ],
        },
      }),
      Session.init(),
    ],
  };
};

export const PreBuiltUIList = [ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI];

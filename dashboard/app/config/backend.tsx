import ThirdPartyNode from "supertokens-node/recipe/thirdparty/index.js";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword/index.js";
import SessionNode from "supertokens-node/recipe/session/index.js";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";
import UserRoles from "supertokens-node/recipe/userroles/index.js";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";
import SuperTokens from "supertokens-node";

export const backendConfig = (): TypeInput => {
  return {
    supertokens: {
      // this is the location of the SuperTokens core.
      connectionURI: "https://try.supertokens.com",
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init(),
      ThirdPartyNode.init({
        signInAndUpFeature: {
          providers: [
            // We have provided you with development keys which you can use for testing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
            {
              config: {
                thirdPartyId: "google",
                clients: [
                  {
                    clientId:
                      "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                    clientSecret: "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",
                  },
                ],
              },
            },
            {
              config: {
                thirdPartyId: "github",
                clients: [
                  {
                    clientId: "467101b197249757c71f",
                    clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                  },
                ],
              },
            },
          ],
        },
      }),
      SessionNode.init(),
      Dashboard.init(),
      UserRoles.init(),
    ],
    isInServerlessEnv: true,
    framework: "custom",
  };
};

let initialized = false;
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}

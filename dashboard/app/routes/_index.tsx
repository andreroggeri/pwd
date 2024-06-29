import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { JwtPayload } from "jsonwebtoken";
import { SessionAuthForRemix } from "../components/sessionAuthForRemix";
import { TryRefreshComponent } from "../components/tryRefreshClientComponent";
import { getSessionForSSR } from "../superTokensHelpers";

export async function loader({ request }: LoaderFunctionArgs): Promise<{
  accessTokenPayload: JwtPayload | undefined;
  hasToken: boolean;
  error: Error | undefined;
}> {
  return getSessionForSSR(request);
}

export default function Home() {
  const navigate = useNavigate();

  const { accessTokenPayload, hasToken, error } = useLoaderData<{
    accessTokenPayload: JwtPayload | undefined;
    hasToken: boolean;
    error: Error | undefined;
  }>();

  //   async function logoutClicked() {
  //     await SessionReact.signOut();
  //     SuperTokens.redirectToAuth();
  //   }

  if (error) {
    return (
      <div>
        Something went wrong while trying to get the session. Error -{" "}
        {error.message}
      </div>
    );
  }

  // `accessTokenPayload` will be undefined if it the session does not exist or has expired
  if (accessTokenPayload === undefined) {
    /**
     * This means that the user is not logged in. If you want to display some other UI in this
     * case, you can do so here.
     */
    if (!hasToken) {
      return navigate("/auth");
    }
    /**
     * This means that the session does not exist but we have session tokens for the user. In this case
     * the `TryRefreshComponent` will try to refresh the session.
     *
     * To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
     */
    return <TryRefreshComponent key={Date.now()} />;
  }

  const fetchUserData = async () => {
    const userInfoResponse = await fetch("http://localhost:3000/sessioninfo");

    alert(JSON.stringify(await userInfoResponse.json()));
  };

  /**
   * SessionAuthForRemix will handle proper redirection for the user based on the different session states.
   * It will redirect to the login page if the session does not exist etc.
   */
  return (
    <SessionAuthForRemix>
      <div>
        <div>
          <div>Login successful</div>
          <div>
            <div>Your userID is: </div>

            <div> {accessTokenPayload.sub}</div>

            <button onClick={() => fetchUserData()}>Call API</button>
          </div>
        </div>
      </div>
    </SessionAuthForRemix>
  );
}

import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { JwtPayload } from "jsonwebtoken";
import { getUser } from "supertokens-node";
import { TryRefreshComponent } from "../components/tryRefreshClientComponent";
import { getSessionForSSR } from "../superTokensHelpers";

export async function loader({ request }: LoaderFunctionArgs): Promise<{
  session: {
    accessTokenPayload: JwtPayload | undefined;
    hasToken: boolean;
    error: Error | undefined;
  };
  email: string | null;
}> {
  const session = await getSessionForSSR(request);

  let email = null;
  if (session?.accessTokenPayload?.sub) {
    const user = await getUser(session.accessTokenPayload.sub!);
    console.log({ user });
    if (user) {
      email = user?.emails[0];
    }
  }

  return { session, email };
}

export default function Home() {
  const navigate = useNavigate();

  const { session, email } = useLoaderData<typeof loader>();

  const { accessTokenPayload, hasToken, error } = session;

  console.log({ accessTokenPayload, hasToken, error });
  // @ts-expect-error - testing if the navigate function is available
  window.testNavigate = navigate;

  if (error) {
    return (
      <div>
        Something went wrong while trying to get the session. Error -{" "}
        {error.message}
      </div>
    );
  }

  // `accessTokenPayload` will be undefined if it the session does not exist or has expired
  if (!accessTokenPayload || !email) {
    /**
     * This means that the user is not logged in. If you want to display some other UI in this
     * case, you can do so here.
     */
    if (!hasToken) {
      console.log("No session found. Redirecting to /auth");
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

  const projects = [
    {
      label: "Project 1 lalalala",
      value: "acme-inc",
    },
    {
      label: "Project 2 lalalalalal",
      value: "monsters",
    },
  ];

  /**
   * SessionAuthForRemix will handle proper redirection for the user based on the different session states.
   * It will redirect to the login page if the session does not exist etc.
   */
  return (
    <>
      <h1> IT WORKS</h1>
    </>
  );
}

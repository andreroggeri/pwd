import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { JwtPayload } from "jsonwebtoken";
import { getUser } from "supertokens-node";
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
  const { session, email } = useLoaderData<typeof loader>();

  console.log({ session, email });

  const { accessTokenPayload, hasToken, error } = session;

  console.log({ accessTokenPayload, hasToken, error });

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

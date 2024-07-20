import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { JwtPayload } from "jsonwebtoken";
import { FaBug, FaCheck, FaHourglass, FaRotate } from "react-icons/fa6";
import { getUser } from "supertokens-node";
import { MainNav } from "~/components/main-nav";
import { Overview } from "~/components/overview";
import ProjectSwitcher from "~/components/project-selector";
import { RecentExecutions } from "~/components/recent-executions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { UserNav } from "~/components/user-nav";
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
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <ProjectSwitcher projects={projects} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav email={email} />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button>Download</Button> */}
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass rate</CardTitle>
                <FaCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.47%</div>
                <p className="text-xs font-bold text-green-500">
                  +4.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Test count
                </CardTitle>
                <FaBug className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Execution count
                </CardTitle>
                <FaRotate className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average execution time
                </CardTitle>
                <FaHourglass className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 minutes</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent executions</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentExecutions />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

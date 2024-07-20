let url: string;
if (typeof window === "undefined") {
  url = process.env.VERCEL_URL!;
} else {
  url = window.location.origin;
}
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Playwright Dashboard",
  apiDomain: url,
  websiteDomain: url,
  apiBasePath: "/supertokens",
  websiteBasePath: "/auth",
};

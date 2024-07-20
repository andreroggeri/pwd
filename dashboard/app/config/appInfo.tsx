let url: string;
if (typeof window === "undefined") {
  url = process.env.VERCEL_URL!;
} else {
  url = window.location.origin;
}

if (!url.includes("http")) {
  url = "https://" + url;
}

console.log({ url });

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Playwright Dashboard",
  apiDomain: url,
  websiteDomain: url,
  apiBasePath: "/supertokens",
  websiteBasePath: "/auth",
};

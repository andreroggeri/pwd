import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session/index.js";
import "./globals.css";
import { frontendConfig } from "./config/frontend";

if (typeof window !== "undefined") {
  SuperTokens.init(frontendConfig());
}

export default function App() {
  const location = useLocation();
  const isUnprotectedRoute = location.pathname.startsWith("/auth");

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="app-wrapper">
        <SuperTokensWrapper>
          {isUnprotectedRoute ? (
            <Outlet />
          ) : (
            <SessionAuth>
              <Outlet />
            </SessionAuth>
          )}

          <ScrollRestoration />
          <Scripts />
        </SuperTokensWrapper>
      </body>
    </html>
  );
}

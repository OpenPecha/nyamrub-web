import {
  json,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./styles/global.css";
import { MetaFunction } from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";
import "./styles/tailwind.css";
import { LoaderFunction } from "@remix-run/node";
import { commitSession, getGuestUserSession, getSession, getUserSession } from "./services/session.server";
import Header from "./components/Header";
import { ActionFunction } from "@remix-run/node";
import { createGuestUser } from "./services/getUserDetail.server";
import HomeTour from "./components/HomeTour";

export const meta: MetaFunction = () => {
  return [
    { title: "Nyamrub" },
    { name: "Description", content: "Nyamrub, contribute and validate" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/assets/iconnyamrub.png",
  },
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/assets/iconnyamrub.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const domain = url.hostname;
  const isLocal = domain === "localhost";

  const auth = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    host: isLocal ? "http://" + domain + ":3000" : "https://" + domain,
  };
  const user = await getUserSession(request);
  const guestUser = await getGuestUserSession(request);
  return { auth, user, guestUser };
};


export default function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  return (
    <div className={`${!isHomepage && "h-screen"}`}>
      <HomeTour />
      <Header />
      <Outlet />
    </div>
  );
}

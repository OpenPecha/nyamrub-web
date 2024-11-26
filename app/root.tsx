import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./styles/global.css";
import { MetaFunction } from "@remix-run/node";

import "./styles/tailwind.css";
import { LoaderFunction } from "@remix-run/node";
import { commitSession, getGuestUserSession, getSession, getUserSession } from "./services/session.server";
import Header from "./components/Header";
import { createUser } from "./services/getUserDetail.server";

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

  const session = await getSession(request.headers.get("Cookie"));

  const user = await getUserSession(request);
  if (!user) {
    const guestUser = {
      name: "Guest",
      username: `guest_${Date.now()}`,
      email: `guest_${Date.now()}@gmail.com`,
      score: 0,
      is_guest: true,
    };
    const GuestUser = await getGuestUserSession(request);
    if (!GuestUser) {
      const user_id = await createUser(guestUser, request);
      const tempUser = { ...guestUser, user_id };
      session.set("guest_user", tempUser);
    }
  }

  const headers = new Headers();
  headers.append("Set-Cookie", await commitSession(session));

  return json(
    { auth, user },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};


export default function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  return (
    <div className={`${!isHomepage && "h-screen"}`}>
      <Header />
      <Outlet />
    </div>
  );
}

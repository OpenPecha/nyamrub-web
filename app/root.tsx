import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./styles/global.css";
import { MetaFunction } from "@remix-run/node";

import "./styles/tailwind.css";
import { LoaderFunction } from "@remix-run/node";
import { getUserSession } from "./services/session.server";
import Header from "./components/Header";

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
    href: "/assets/logo.png",
  },
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/assets/logo.png",
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
  const user = await getUserSession(request);
  return { user };
};

export default function App() {
  return (
    <>
      <Header />
      <Outlet />;
    </>
  );
}

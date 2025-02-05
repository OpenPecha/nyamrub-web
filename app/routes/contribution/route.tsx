import {
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import TabBar from "./components/TabBar";
import { getUserSession, getGuestUserSession } from "~/services/session.server";
import InsiderTour from "~/components/InsiderTour";
import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  const guestUser = await getGuestUserSession(request);

  // If no user and no guest user, redirect to home page
  if (!user && !guestUser) {
    return redirect("/");
  }

  return json({ user: user || guestUser });

};

export default function Route() {

  return (
    <div className="bg-primary-50 h-[calc(100vh-90px)]">
      <InsiderTour />
      <TabBar />
    </div>
  );
}

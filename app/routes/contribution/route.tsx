import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import TabBar from "./components/TabBar";
import GuestUser from "./components/GuestUser";
import {
  commitSession,
  getSession,
  getUserSession,
  getGuestUserSession,
} from "~/services/session.server";
import { createGuestUser } from "~/services/getUserDetail.server";
import LoginModal from "~/components/LoginModal";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  const guestUser = await getGuestUserSession(request);
  return json({ user, guestUser });
};

export default function Route() {
  const { user, guestUser } = useLoaderData<typeof loader>();

  return (
    <div className="bg-primary-50 h-[calc(100vh-90px)]">
      <TabBar />
    </div>
  );
}

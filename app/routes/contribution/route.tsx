import {
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import TabBar from "./components/TabBar";
import { getUserSession, getGuestUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  const guestUser = await getGuestUserSession(request);

  // If no user and no guest user, redirect to home page
  if (!user && !guestUser) {
    return redirect("/");
  }

  return json({ user, guestUser });
};

export default function Route() {

  return (
    <div className="bg-primary-50 h-[calc(100vh-90px)]">
      <TabBar />
    </div>
  );
}

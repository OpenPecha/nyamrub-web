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

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  const guestUser = await getGuestUserSession(request);

  return json({ user, guestUser });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    // Retrieve the session and form data
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();

    // Validate form data
    const name = formData.get("name") as string;
    if (!name || typeof name !== "string") {
      return json(
        { error: "Name is required and must be a string." },
        { status: 400 }
      );
    }

    // Check for existing user or guest user
    const user = await getUserSession(request);
    const guestUser = await getGuestUserSession(request);

    // If no user exists, create a new guest user
    if (!user && !guestUser) {
      const firstName = name.split(" ")[0];

      const newGuestUser = {
        name,
        username: `${firstName}${Date.now()}`,
        email: `${firstName}${Date.now()}@gmail.com`,
        score: 0,
        is_guest: true,
      };

      const user_id = await createGuestUser(newGuestUser, request);
      const tempUser = { ...newGuestUser, user_id };

      session.set("guest_user", tempUser);
      // Commit the session and redirect
      return redirect("/contribution/mt/contribute", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    // Return the user or guest user if they exist
    return json({ user, guestUser });
  } catch (error) {
    console.error("Error handling action:", error);

    // Return a generic error response
    return json(
      { error: "Error creating guest user." },
      { status: 500 }
    );
  }
};


export default function Route() {
  const { user, guestUser } = useLoaderData<typeof loader>();

  return (
    <div className="bg-primary-50 h-[calc(100vh-90px)]">
      {user || guestUser ? <TabBar /> : <GuestUser />}
    </div>
  );
}

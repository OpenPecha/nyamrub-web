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
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();

    // Validate name more concisely
    const name = formData.get("name");
    if (!name || typeof name !== "string") {
      return json(
        { error: "Name is required and must be a string." },
        { status: 400 }
      );
    }
    const existingUser = await getUserSession(request);
    const existingGuestUser = await getGuestUserSession(request);

    if (existingUser || existingGuestUser) {
      return json({ user: existingUser, guestUser: existingGuestUser });
    }
    const firstName = name.trim().split(/\s+/)[0];
    const uniqueEmail = `${firstName.toLowerCase()}${Date.now()}@guest.example.com`;

    const newGuestUser = {
      name,
      username: firstName.toLowerCase(),
      email: uniqueEmail,
      score: 0,
      is_guest: true,
    };

    const createResult = await createGuestUser(newGuestUser, request);

    if (!createResult || createResult.error) {
      return json(
        {
          error:
            createResult?.error ||
            "Failed to create a guest user. Please try again later.",
        },
        { status: 500 }
      );
    }

    session.set("guest_user", { ...newGuestUser, user_id: createResult });
    return redirect("/contribution/mt/contribute", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error("Error handling action:", error);
    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      },
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

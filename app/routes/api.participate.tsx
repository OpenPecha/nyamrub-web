import { ActionFunction, json, redirect } from "@remix-run/node";
import { createGuestUser } from "~/services/getUserDetail.server";
import { commitSession, getSession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("herrrr")
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const createResult = await createGuestUser(request);

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

    session.set("guest_user", { user_id: createResult });

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
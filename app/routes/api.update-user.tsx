import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";
import { updateUser } from "~/services/update-user.server";

export const action: ActionFunction = async ({ request }) => {
  // Validate request method
  if (request.method !== "PUT") {
    return json(
      { status: "error", message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const username = formData.get("username")?.toString().trim();
    const user = await getUserSession(request);

    // Enhanced validation with more specific error messages
    if (!user) {
      return json(
        { status: "error", message: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!name || name.length < 2) {
      return json(
        { status: "error", message: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    if (!username || username.length < 3) {
      return json(
        {
          status: "error",
          message: "Username must be at least 3 characters long",
        },
        { status: 400 }
      );
    }

    // Perform user update
    const result = await updateUser(user.user_id, name, username);

    return json({
      status: "success",
      data: result,
    });
  } catch (error) {
    // Comprehensive error handling
    console.error("User update action error:", error);

    // Check if error is an instance of Error to safely access message
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return json(
      {
        status: "error",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
};

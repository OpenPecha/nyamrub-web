import { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node"; // Import `json` from `@remix-run/node`
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const user = await getUserSession(request);

  if (!user || !user.user_id) {
    return json(
      { status: "error", message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${API_ENDPOINT}/user/${user.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // Handle non-2xx responses
      return json(
        { status: "error", message: "Failed to fetch user details" },
        { status: res.status }
      );
    }

      const data = await res.json(); // Parse the JSON data from the response
      console.log("User details:", data);
    return json(data); // Return the data using `json`
  } catch (error) {
    console.error("Error fetching user details:", error);
    return json(
      { status: "error", message: "Failed to get user details" },
      { status: 500 }
    );
  }
};

import { LoaderFunction, json } from "@remix-run/node";
export const loader: LoaderFunction = async ({ request }) => {
  const API_URL = process.env.API_ENDPOINT as string;
  const numOfUsers = 5; 

  const url = `${API_URL}/get_top_users_with_score/?num_of_users=${numOfUsers}`;

  try {
      const response = await fetch(url, {
        headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Response(error.detail || "Failed to fetch data", {
        status: response.status,
      });
    }

      const data = await response.json();
    return json(data);
  } catch (e) {
    console.error("Failed to fetch top contributors:", e);
    return json({ error: "Failed to load contributors" }, { status: 500 });
  }
};

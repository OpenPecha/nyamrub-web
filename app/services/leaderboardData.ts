// services/userService.ts
import { redirect } from "@remix-run/node";

export async function fetcherLeaderboarData(user: { user_id: string }) {
  const API_ENDPOINT = process.env.API_ENDPOINT;

  if (!API_ENDPOINT) {
    throw new Response("API endpoint not configured", { status: 500 });
  }

  if (!user || !user.user_id) {
    console.log("No user found");
    return redirect("/");
  }

  try {
    const [
      contributionsResponse,
      userDetailsResponse,
      topContributorsResponse,
    ] = await Promise.all([
      fetch(`${API_ENDPOINT}/user_contributions/${user.user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch(`${API_ENDPOINT}/user/${user.user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch(`${API_ENDPOINT}/score/top_contributors/${user.user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ]);

    // Check responses
    if (!contributionsResponse.ok) {
      throw new Error(
        `Failed to fetch contributions: ${contributionsResponse.statusText}`
      );
    }
    if (!userDetailsResponse.ok) {
      throw new Error(
        `Failed to fetch user details: ${userDetailsResponse.statusText}`
      );
    }
    if (!topContributorsResponse.ok) {
      throw new Error(
        `Failed to fetch top contributors: ${topContributorsResponse.statusText}`
      );
    }

    // Parse responses
    const [contributions, profileDetails, contributorsData] = await Promise.all([
      contributionsResponse.json(),
      userDetailsResponse.json(),
      topContributorsResponse.json(),
    ]);
      
      return {
      user,
      contributions,
      profileDetails,
      contributorsData,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Response("Error fetching user data", { status: 500 });
  }
}

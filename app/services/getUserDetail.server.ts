import { getHeaders } from "~/lib/getHeaders.server";
import { getUserSession } from "./session.server";

export const createGuestUser = async ( request) => {
  const API_URL = process.env.API_ENDPOINT;
  if (!API_URL) {
    throw new Error("API endpoint is not configured");
  }

  try {
    const response = await fetch(`${API_URL}/guest_users/`, {
      method: "POST",
      headers: await getHeaders(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.detail || "Failed to create guest user" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating guest user:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error creating guest user",
    };
  }
};

export const createUser = async (user, request) => {
  const API_URL = process.env.API_ENDPOINT as string;
  const url = API_URL + "/users/";
  try {
    const response = await fetch(url, {
      body: JSON.stringify({
        name: user.name,
        username: user.nickname,
        email: user.email,
        profile_image_url: user.picture,
        user_id: user.user_id,
      }),
      headers: await getHeaders(request),
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return null;
  }
};

export const getUserDetail = async (request) => {
  const user = await getUserSession(request);
  if (user) {
    const API_URL = process.env.API_ENDPOINT as string;
    const url = API_URL + "/api/v1/user/" + user.email;
    try {
      const response = await fetch(url, {
        headers: await getHeaders(request),
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return null;
    }
  }
  return null;
};


import { getHeaders } from "~/lib/getHeaders.server";
import { getUserSession } from "./session.server";

export const createUser = async (user, request) => {
  const API_URL = process.env.API_ENDPOINT as string;
  const url = API_URL + "/users/";
  try {
    const response = await fetch(url, {
      body: JSON.stringify({
        name: user.name,
        username: user.name,
        email: user.email,
        profile_image_url: user.picture,
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


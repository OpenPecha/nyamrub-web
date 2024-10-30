import { getHeaders } from "~/lib/getHeaders.server";
import { getUserSession } from "./session.server";

export const createUser = async (user, request) => {
  const API_URL = process.env.API_ENDPOINT as string;
  const url = API_URL + "/create_user";
  try {
    const response = await fetch(url, {
      body: JSON.stringify({
        name: user.name,
        username: user.name,
        email: user.email,
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

function checkUserFields(user) {
  const requiredFields = [
    "gender",
    "birth_date",
    "interest",
    "profession",
    "city",
    "country",
  ];
  const missingOrEmptyFields = [];

  requiredFields.forEach((field) => {
    if (!user[field]) {
      // Check if the value is null, undefined, or an empty string
      missingOrEmptyFields.push(field);
    }
  });

  if (missingOrEmptyFields.length > 0) {
    return `Missing or empty fields: ${missingOrEmptyFields.join(", ")}`;
  } else {
    return true;
  }
}

export const isComplete = async (request) => {
  const res = await getUserDetail(request);
  const user = res?.user;
  if (!user) return null;
  const data = checkUserFields(user);
  return data;
};

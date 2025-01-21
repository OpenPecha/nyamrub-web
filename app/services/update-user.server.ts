import { json } from "@remix-run/react";

interface UpdateUserResponse {
  id: string;
  name: string;
  username: string;
}

interface ApiErrorResponse {
  detail: string;
  status?: number;
}

export const updateUser = async (
  user_id: string,
  name: string,
  username: string
): Promise<UpdateUserResponse> => {
  const API_URL = process.env.API_ENDPOINT;

  if (!API_URL) {
    throw new Error("API endpoint is not configured");
  }

  const url = `${API_URL}/user/${user_id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username }),
    });

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(
        errorData.detail || `Failed to update user. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`User update error: ${error.message}`);
    } else {
      console.error("Unknown error during user update", error);
    }

    throw error;
  }
};

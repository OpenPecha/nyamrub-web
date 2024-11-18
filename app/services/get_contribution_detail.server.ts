import { json } from "@remix-run/react";
import { getUserSession } from "./session.server";
import { getHeaders } from "~/lib/getHeaders.server";

const API_ENDPOINT = process.env.API_ENDPOINT as string;

export const getTopContributors = async (request) => {
  const user = await getUserSession(request);
    const url = `${API_ENDPOINT}/overall_top_contributors/${user.user_id}`;
    console.log(url)
  try {
    const response = await fetch(url, {
      headers: await getHeaders(request),
      method: "GET",
    });
      
    const topContributors = await response.json();
    return topContributors;
  } catch (error) {
      return null
  }
};

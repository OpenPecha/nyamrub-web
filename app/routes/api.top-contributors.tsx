import { LoaderFunction, json } from "@remix-run/node";
import { getTopContributors } from "~/services/get_contribution_detail.server";
export const loader: LoaderFunction = async ({ request }) => {
 
  try {
    const res = await getTopContributors(request)
    
    return json(res)
  } catch (e) {
    console.error("Failed to fetch top contributors:", e);
    return json({ error: "Failed to load contributors" }, { status: 500 });
  }
};

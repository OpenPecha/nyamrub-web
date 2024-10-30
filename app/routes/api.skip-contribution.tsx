import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const apiEndpoint = process.env.API_ENDPOINT; // Access .env variable here

  const formData = await request.formData();
  const contribution_id = formData.get("contribution_id");

  const response = await fetch(
    `${apiEndpoint}/delete_contribution/${contribution_id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete contribution");
  }

  return json({
    status: "success",
    message: "Contribution delete successfully",
  });
};

import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const API_ENDPOINT = process.env.API_ENDPOINT as string;
  const contributionId = formData.get("contribution_id") as string;

  if (!contributionId) {
    return json(
      { status: "error", message: "Contribution ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/delete_tts_contribution/${contributionId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete contribution");
    }
    return json({
      status: "success",
      message: "Contribution deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contribution:", error);
    return json(
      { status: "error", message: "Failed to delete contribution" },
    );
  }
};

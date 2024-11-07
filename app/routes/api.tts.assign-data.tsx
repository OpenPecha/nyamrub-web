import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const API_ENDPOINT = process.env.API_ENDPOINT as string;
    const userId = formData.get("user_id") as string;
    console.log("userId:", userId);

  if (!userId) {
    return json(
      { status: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/prepare_five_tts_contributions/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ttsContribution = await response.json();
    return {
      status: "success", message: "Contribution created successfully",
      data: ttsContribution
     };
  } catch (error) {
    console.error("Error in prepareTTSContribution action:", error);
    return json(
      { status: "error", message: "Failed to create TTS contribution" }
    );
  }
};

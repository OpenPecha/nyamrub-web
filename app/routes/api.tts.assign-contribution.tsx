import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const API_ENDPOINT = process.env.API_ENDPOINT as string;
  const userId = formData.get("user_id") as string;

  if (!userId) {
    return json(
      { status: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/prepare_five_tts_validations/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ttsValidation = await response.json();
    return {
      status: "success",
      message: "Contribution created successfully",
      data: ttsValidation,
    };
  } catch (error) {
    console.error("Error in prepareTTSContribution action:", error);
    return json(
      { status: "error", message: "Failed to create TTS contribution" }
    );
  }
};

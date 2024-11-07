import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const API_ENDPOINT = process.env.API_ENDPOINT as string;
  const contributionId = formData.get("contribution_id") as string;
  const audioUrl = formData.get("audio_url") as string;

  if (!contributionId || !audioUrl) {
    return json(
      {
        status: "error",
        message: "Contribution ID and audio URL are required",
      },
      { status: 400 }
    );
  }

    try {
        const response = await fetch(
            `${API_ENDPOINT}/update_tts_contribution/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contribution_id: contributionId,
            url: audioUrl,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update contribution");
      }

      const updatedContribution = await response.json();
      return {
        status: "success",
        message: "Contribution updated successfully",
        data: updatedContribution,
      };
  } catch (error) {
    console.error("Error in contributeAudio action:", error);
    return json(
      { status: "error", message: "Failed to update contribution" },
    );
  }
};

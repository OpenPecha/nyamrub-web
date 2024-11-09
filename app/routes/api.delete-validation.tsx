import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const API_ENDPOINT = process.env.API_ENDPOINT as string;
  const validationId = formData.get("validation_id") as string;

  if (!validationId) {
    return json(
      { status: "error", message: "Validation ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/delete_tts_validation/${validationId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete validation");
    }

    return json({
      status: "success",
      message: "Validation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting validation:", error);
    return json(
      { status: "error", message: "Failed to delete validation" },
      { status: 500 }
    );
  }
};

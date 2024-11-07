import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const API_ENDPOINT = process.env.API_ENDPOINT as string;
  const validationId = formData.get("validation_id") as string;
  const isValid = formData.get("is_valid") === "true"; // Convert to boolean

  if (!validationId) {
    return json(
      {
        status: "error",
        message: "Validation ID is required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/update_tts_validation/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        validation_id: validationId,
        is_valid: isValid,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update validation");
    }

    const updatedValidation = await response.json();
    console.log("Updated Validation:", updatedValidation);

    return json({
      status: "success",
      message: "Validation updated successfully",
      data: updatedValidation,
    });
  } catch (error) {
    console.error("Error updating validation:", error);
    return json(
      {
        status: "error",
        message: "Failed to update validation",
      }
    );
  }
};

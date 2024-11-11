// app/routes/update-validation.tsx
import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { updateValidation } from "~/services/validation.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const validationId = formData.get("validation_id") as string;
  const isValid = formData.get("is_valid") === "true";
  const type = formData.get("type") as "tts" | "stt" | "ocr" | "mt";

  if (!validationId || !type) {
    return json(
      {
        status: "error",
        message: "Validation ID and type are required",
      },
      { status: 400 }
    );
  }

  try {
    const result = await updateValidation(type, validationId, isValid);
    return json(result);
  } catch (error) {
    console.error(`Error updating ${type} validation:`, error);
    return json(
      {
        status: "error",
        message: `Failed to update ${type.toUpperCase()} validation`,
      },
      { status: 500 }
    );
  }
};

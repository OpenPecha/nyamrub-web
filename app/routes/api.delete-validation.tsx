import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { deleteValidation } from "~/services/delete_validation";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const validationId = formData.get("validation_id") as string;
  const type = formData.get("type") as "tts" | "stt" | "ocr" | "mt";

  if (!validationId || !type) {
    return json(
      { status: "error", message: "Validation ID and type are required" },
      { status: 400 }
    );
  }

  try {
    const result = await deleteValidation(type, validationId); 
    return json(result);
  } catch (error) {
    console.error(`Error deleting ${type} validation:`, error);
    return json(
      {
        status: "error",
        message: `Failed to delete ${type.toUpperCase()} validation`,
      },
      { status: 500 }
    );
  }
};

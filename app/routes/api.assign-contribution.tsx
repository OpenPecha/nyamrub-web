import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { prepareValidation } from "~/services/assign_contribution";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("user_id") as string;
  const type = formData.get("type") as "tts" | "stt" | "ocr" | "mt";

  if (!userId || !type) {
    return json(
      { status: "error", message: "User ID and type are required" },
      { status: 400 }
    );
  }

  try {
    const result = await prepareValidation(type, userId);
    return json(result);
  } catch (error) {
    console.error(`Error in prepareValidation action for ${type}:`, error);
    return json(
      {
        status: "error",
        message: `Failed to prepare ${type.toUpperCase()} validations`,
      },
      { status: 500 }
    );
  }
};

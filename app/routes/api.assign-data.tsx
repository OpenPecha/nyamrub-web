// app/routes/prepare-contribution.tsx
import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { prepareContribution } from "~/services/assign_source_data";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get("type") as "tts" | "stt" | "ocr" | "mt";
  const userId = formData.get("user_id") as string;
  if (!userId || !type) {
    return json(
      { status: "error", message: "User ID and type are required" },
      { status: 400 }
    );
  }

  try {
    const result = await prepareContribution(type, userId);
    return json(result); 
  } catch (error) {
    console.error(`Error in prepareContribution action for ${type}:`, error);
    return json(
      {
        status: "error",
        message: `Failed to create ${type.toUpperCase()} contribution`,
      },
      { status: 500 }
    );
  }
};

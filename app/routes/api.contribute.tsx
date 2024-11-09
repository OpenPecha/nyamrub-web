// app/routes/contribute.tsx
import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { updateContribution } from "~/services/contribution.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get("type") as "mt" | "ocr" | "stt" | "tts";
  const contributionId = formData.get("contribution_id") as string;
  const contributionData = formData.get("contribution_data") as string;
  
  if (!contributionId || !type) {
    return json(
      { status: "error", message: "Contribution ID and type are required" },
      { status: 400 }
    );
  }

  try {
    const result = await updateContribution(type, contributionId, contributionData);
    return json(result);
  } catch (error) {
    console.error(`Error in ${type} contribution action:`, error);
    return json(
      { status: "error", message: `Failed to update ${type} contribution` },
      { status: 500 }
    );
  }
};

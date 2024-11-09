// app/routes/contribute.tsx
import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { deleteContribution } from "~/services/delete_contribution.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const contributionId = formData.get("contribution_id") as string;
  const type = formData.get("type") as "tts" | "ocr" | "stt" | "mt";

  if (!contributionId || !type) {
    return json(
      { status: "error", message: "Contribution ID and type are required" },
      { status: 400 }
    );
  }

  try {
    const result = await deleteContribution(type, contributionId); 
    return json(result);
  } catch (error) {
    console.error(`Error deleting ${type} contribution:`, error);
    return json(
      { status: "error", message: `Failed to delete ${type} contribution` },
      { status: 500 }
    );
  }
};

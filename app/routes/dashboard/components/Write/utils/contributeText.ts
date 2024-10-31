export default async function contributeText(
  contribution_id: string,
  target_text: string
) {
  try {
    const response = await fetch(
      "http://localhost:8000/update_mt_contribution/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contribution_id: contribution_id,
          text: target_text,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update contribution");
    }

    const updatedContribution = await response.json();
    console.log("Updated Contribution:", updatedContribution);
    return { status: "success", message: "Contribution updated successfully" };
  } catch (error) {
    console.error("Error updating contribution:", error);
    return { status: "error", message: "Failed to update contribution" };
  }
}

export default async function deleteContribution(
  contributionId: string
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(
      `https://monlam-contribution-backend.onrender.com/delete_tts_contribution/${contributionId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete contribution");
    }

    return { status: "success", message: "Contribution deleted successfully" };
  } catch (error) {
    console.error("Error deleting contribution:", error);
    return { status: "error", message: "Failed to delete contribution" };
  }
}

export default async function deleteValidation(
  validation_id: string
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(
      `http://localhost:8000/delete_mt_validation/${validation_id}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete validation");
    }

    return { status: "success", message: "Validation deleted successfully" };
  } catch (error) {
    console.error("Error deleting validation:", error);
    return { status: "error", message: "Failed to delete Validation" };
  }
}

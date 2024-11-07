export default async function validateText(
  validation_id: string,
  is_valid: boolean
) {
  try {
    const response = await fetch(
      "http://localhost:8000/update_mt_validation/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          validation_id,
          is_valid,
        }),
      }
    );
    if (!response.ok) {
        throw new Error("Failed to update contribution");
    }

    const updatedValidation = await response.json();
    console.log("Updated Validation:", updatedValidation);
    return { status: "success", message: "validation updated successfully" };
  } catch (error) {
    console.error("Error updating validation:", error);
    return { status: "error", message: "Failed to update validation" };
  }
}

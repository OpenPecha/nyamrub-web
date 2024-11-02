export async function prepareMTContribution(user_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/prepare_five_mt_contributions/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ttsContribution = await response.json();
    console.log("created Contribution:", ttsContribution);
    return { status: "success", message: "Contribution created successfully" };
  } catch (error) {
    console.error("Error updating contribution:", error);
    return { status: "error", message: "Failed to update contribution" };
  }
}

export async function prepareMTValidations(user_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/prepare_five_mt_validations/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ttsValidations = await response.json();
    console.log("created validation:", ttsValidations);
    return { status: "success", message: "Validation created successfully" };
  } catch (error) {
    console.error("Error updating contribution:", error);
    return { status: "error", message: "Failed to update validation" };
  }
}

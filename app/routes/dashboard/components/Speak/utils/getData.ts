export async function prepareTTSContribution(user_id: string) {
  try {
    const response = await fetch(
      `https://monlam-contribution-backend.onrender.com/prepare_five_tts_contributions/${user_id}`,
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

export async function prepareTTSValidations(user_id: string) {
  try {
    const response = await fetch(
      `https://monlam-contribution-backend.onrender.com/prepare_five_tts_validations/${user_id}`,
      {
        method: "GET",
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
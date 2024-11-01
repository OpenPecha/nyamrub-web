export async function prepareTTSContribution(user_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/prepare_five_tts_contributions/${user_id}`,
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

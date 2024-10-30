export default async function contributeAudio( contribution_id:string, audio_url:string ) {
    try {
        const response = await fetch(
          "http://localhost:8000/update_tts_contribution/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contribution_id: contribution_id,
              url: audio_url,
            }),
          }
        );
        // if (!response.ok) {
        //     throw new Error("Failed to update contribution");
        // }

        const updatedContribution = await response.json();
        console.log("Updated Contribution:", updatedContribution);
        return { status: "success", message: "Contribution updated successfully" };
    } catch (error) {
        console.error("Error updating contribution:", error);
        return { status: "error", message: "Failed to update contribution" };
    }
}

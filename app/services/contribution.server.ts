const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ContributionType = "mt" | "ocr" | "stt" | "tts";

export async function updateContribution(
  type: ContributionType,
  contributionId: string,
  constributionData: string
) {
    
  const endpoints = {
    mt: `${API_ENDPOINT}/update_mt_contribution/`,
    ocr: `${API_ENDPOINT}/update_ocr_contribution/`,
    stt: `${API_ENDPOINT}/update_stt_contribution/`,
    tts: `${API_ENDPOINT}/update_tts_contribution/`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid contribution type: ${type}`);
  }

  // Construct request body based on type
  const body = {
    contribution_id: contributionId,
    ...(type === "tts"
      ? { url: constributionData }
      : { text: constributionData }),
  };
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${type} contribution`);
    }

    const updatedContribution = await response.json();
    return {
      status: "success",
      message: `${type.toUpperCase()} contribution updated successfully`,
      data: updatedContribution,
    };
  } catch (error) {
    console.error(`Error in updateContribution for ${type}:`, error);
    throw new Error(`Failed to update ${type} contribution`);
  }
}

// app/services/contribution.server.ts

const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ContributionType = "tts" | "stt" | "ocr" | "mt";

export async function prepareContribution(
  type: ContributionType,
  userId: string
) {
  // Define endpoints for each type
  const endpoints = {
    tts: `${API_ENDPOINT}/prepare_five_tts_contributions`,
    stt: `${API_ENDPOINT}/prepare_five_stt_contributions`,
    ocr: `${API_ENDPOINT}/prepare_five_ocr_contributions`,
    mt: `${API_ENDPOINT}/prepare_five_mt_contributions`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid contribution type: ${type}`);
  }
  console.log(`Preparing ${type} contribution for user ${userId}`);
  try {
    const response = await fetch(`${endpoint}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${type.toUpperCase()} contribution`);
    }

    const contributionData = await response.json();
    return {
      status: "success",
      message: `${type.toUpperCase()} contribution created successfully`,
      data: contributionData,
    };
  } catch (error) {
    console.error(`Error in prepareContribution for ${type}:`, error);
    throw new Error(`Failed to create ${type.toUpperCase()} contribution`);
  }
}

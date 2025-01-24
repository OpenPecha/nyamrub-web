// app/services/contribution.server.ts

const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ContributionType = "tts" | "stt" | "ocr" | "mt";

export async function prepareContribution(
  type: ContributionType,
  userId: string
) {
  // Define endpoints for each type
  const endpoints = {
    tts: `${API_ENDPOINT}/tts/prepare/contributions/${userId}`,
    stt: `${API_ENDPOINT}/stt/prepare/contributions/${userId}`,
    ocr: `${API_ENDPOINT}/ocr/prepare/contributions/${userId}`,
    mt: `${API_ENDPOINT}/mt/prepare/contributions/${userId}`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid contribution type: ${type}`);
  }
  console.log(`Preparing ${type} contribution for user ${userId}`);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
console.log("respon :::: ",response)
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

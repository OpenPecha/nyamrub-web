const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ContributionType = "tts" | "ocr" | "stt" | "mt";

export async function deleteContribution(
  type: ContributionType,
  contributionId: string
) {
    
  const endpoints = {
    tts: `${API_ENDPOINT}/tts/contribution/${contributionId}`,
    ocr: `${API_ENDPOINT}/ocr/contribution/${contributionId}`,
    stt: `${API_ENDPOINT}/stt/contribution/${contributionId}`,
    mt: `${API_ENDPOINT}/mt/contribution/${contributionId}`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid contribution type: ${type}`);
  }

  try {
    const response = await fetch(endpoint, {
      method: "delete",
    });
    console.log("respon::::",response)
    if (!response.ok) {
      throw new Error(`Failed to delete ${type} contribution`);
    }

    return {
      status: "success",
      message: `${type.toUpperCase()} contribution deleted successfully`,
    };
  } catch (error) {
    console.error(`Error deleting ${type} contribution:`, error);
    throw new Error(`Failed to delete ${type} contribution`);
  }
}

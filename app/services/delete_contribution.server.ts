const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ContributionType = "tts" | "ocr" | "stt" | "mt";

export async function deleteContribution(
  type: ContributionType,
  contributionId: string
) {
    
  const endpoints = {
    tts: `${API_ENDPOINT}/delete_tts_contribution`,
    ocr: `${API_ENDPOINT}/delete_ocr_contribution`,
    stt: `${API_ENDPOINT}/delete_stt_contribution`,
    mt: `${API_ENDPOINT}/delete_mt_contribution`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid contribution type: ${type}`);
  }

  try {
    const response = await fetch(`${endpoint}/${contributionId}/`, {
      method: "DELETE",
    });

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

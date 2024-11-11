const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ValidationType = "tts" | "stt" | "ocr" | "mt";

export async function deleteValidation(
  type: ValidationType,
  validationId: string
) {
    
  const endpoints = {
    tts: `${API_ENDPOINT}/delete_tts_validation`,
    stt: `${API_ENDPOINT}/delete_stt_validation`,
    ocr: `${API_ENDPOINT}/delete_ocr_validation`,
    mt: `${API_ENDPOINT}/delete_mt_validation`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid validation type: ${type}`);
  }

  try {
    const response = await fetch(`${endpoint}/${validationId}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${type.toUpperCase()} validation`);
    }

    return {
      status: "success",
      message: `${type.toUpperCase()} validation deleted successfully`,
    };
  } catch (error) {
    console.error(`Error deleting ${type} validation:`, error);
    throw new Error(`Failed to delete ${type.toUpperCase()} validation`);
  }
}
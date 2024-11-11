const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ValidationType = "tts" | "stt" | "ocr" | "mt";

export async function prepareValidation(type: ValidationType, userId: string) {
  const endpoints = {
    tts: `${API_ENDPOINT}/prepare_five_tts_validations`,
    stt: `${API_ENDPOINT}/prepare_five_stt_validations`,
    ocr: `${API_ENDPOINT}/prepare_five_ocr_validations`,
    mt: `${API_ENDPOINT}/prepare_five_mt_validations`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid validation type: ${type}`);
  }

  try {
    const response = await fetch(`${endpoint}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to prepare ${type.toUpperCase()} validations`);
    }

    const validationData = await response.json();
    return {
      status: "success",
      message: `${type.toUpperCase()} validations prepared successfully`,
      data: validationData,
    };
  } catch (error) {
    console.error(`Error in prepareValidation for ${type}:`, error);
    throw new Error(`Failed to prepare ${type.toUpperCase()} validations`);
  }
}

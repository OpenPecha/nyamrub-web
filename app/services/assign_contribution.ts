const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ValidationType = "tts" | "stt" | "ocr" | "mt";

export async function prepareValidation(type: ValidationType, userId: string) {
  const endpoints = {
    tts: `${API_ENDPOINT}/tts/prepare/validations/${userId}`,
    stt: `${API_ENDPOINT}/stt/prepare/validations/${userId}`,
    ocr: `${API_ENDPOINT}/ocr/prepare/validations/${userId}`,
    mt: `${API_ENDPOINT}/mt/prepare/validations/${userId}`,
  };
  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid validation type: ${type}`);
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
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

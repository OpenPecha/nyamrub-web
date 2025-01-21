const API_ENDPOINT = process.env.API_ENDPOINT as string;

type ValidationType = "tts" | "stt" | "ocr" | "mt";

export async function updateValidation(
  type: ValidationType,
  validationId: string,
  isValid: boolean
) {
  const endpoints = {
    tts: `${API_ENDPOINT}/tts/validation`,
    stt: `${API_ENDPOINT}/stt/validation`,
    ocr: `${API_ENDPOINT}/ocr/validation`,
    mt: `${API_ENDPOINT}/mt/validation`,
  };

  const endpoint = endpoints[type];
  if (!endpoint) {
    throw new Error(`Invalid validation type: ${type}`);
  }

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        validation_id: validationId,
        is_valid: isValid,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${type.toUpperCase()} validation`);
    }

    const updatedValidation = await response.json();

    return {
      status: "success",
      message: `${type.toUpperCase()} validation updated successfully`,
      data: updatedValidation,
    };
  } catch (error) {
    console.error(`Error updating ${type} validation:`, error);
    throw new Error(`Failed to update ${type.toUpperCase()} validation`);
  }
}

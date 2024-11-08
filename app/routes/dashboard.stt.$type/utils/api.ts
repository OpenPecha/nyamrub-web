export async function showListenContributor(user_id: string) {
  // const END_POINT = import.meta.env.API_ENDPOINT
  try {
    const response = await fetch(
      `http://localhost:8080/show_stt_data_to_contributor/${user_id}`
    );
    const orcData = await response.json();
    return { status: "success", data: orcData };
  } catch (error) {
    console.error("Error updating contribution:", error);
    return { status: "error", message: "Failed to load ocr contribution" };
  }
}

export async function showListenValidation(user_id: string) {
  // const END_POINT = import.meta.env.API_ENDPOINT
  try {
    const response = await fetch(
      `http://localhost:8080/show_stt_data_and_contribution_to_validator/${user_id}`
    );
    const listenData = await response.json();
    return { status: "success", data: listenData };
  } catch (error) {
    console.error("Error updating contribution:", error);
    return { status: "error", message: "Failed to load ocr contribution" };
  }
}

export async function contributeListen(contribution_id: string, text: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/update_sst_contribution/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contribution_id: contribution_id,
          text: text,
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

export async function deleteContribution(
  contributionId: string
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(
      `http://localhost:8080/delete_stt_contribution/${contributionId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete contribution");
    }

    return { status: "success", message: "Contribution deleted successfully" };
  } catch (error) {
    console.error("Error deleting contribution:", error);
    return { status: "error", message: "Failed to delete contribution" };
  }
}

export async function deleteValidation(
  validationId: string
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(
      `http://localhost:8080/delete_stt_validation/${validationId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete Validation");
    }

    return { status: "success", message: "validate data deleted successfully" };
  } catch (error) {
    console.error("Error deleting validate:", error);
    return { status: "error", message: "Failed to delete validation" };
  }
}

export async function updateListenValidation(id: string, boolValue: boolean) {
  // const END_POINT = import.meta.env.API_ENDPOINT
  try {
    const response = await fetch(
      `http://localhost:8080/update_stt_validation/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          validation_id: id,
          is_valid: boolValue,
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

export async function prepareSTTValidation(user_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/prepare_five_stt_validations/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ocrContribution = await response.json();
    console.log("created Validation data:", ocrContribution);
    return { status: "success", message: "Validation created successfully" };
  } catch (error) {
    console.log("validation error >>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
    console.error("Error updating Validation:", error);
    return { status: "error", message: "Failed to update Validation" };
  }
}

export async function prepareSTTContribution(user_id: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/prepare_five_stt_contributions/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ocrContribution = await response.json();
    console.log("created Validation data:", ocrContribution);
    return { status: "success", message: "Validation created successfully" };
  } catch (error) {
    console.log("validation error >>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
    console.error("Error updating Validation:", error);
    return { status: "error", message: "Failed to update Validation" };
  }
}

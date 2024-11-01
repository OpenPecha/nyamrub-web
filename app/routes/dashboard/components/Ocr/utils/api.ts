export async function updateOCRContribution( contribution_id:string, text:string ) {
    // const END_POINT = import.meta.env.API_ENDPOINT
    console.log()
    try {
        const response = await fetch(`http://localhost:8000/update_ocr_contribution/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    contribution_id: contribution_id,
                    text: text,
                }
            ),
        });
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

export async function prepareOCRContribution(user_id: string) {
    try {
        const response = await fetch(`http://localhost:8000/prepare_five_ocr_contributions/${user_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        

        const ocrContribution = await response.json();
        console.log("created Contribution:", ocrContribution);
        return { status: "success", message: "Contribution created successfully" };
    } catch (error) {
        console.error("Error updating contribution:", error);
        return { status: "error", message: "Failed to update contribution" };
    }
}


export async function deleteOCRConrtibution(
    contribution_id: string
  ): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(
        `http://localhost:8000/delete_ocr_contribution/${contribution_id}/`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete Contribution");
      }
  
      return { status: "success", message: "contribution data deleted successfully" };
    } catch (error) {
      console.error("Error deleting contribution:", error);
      return { status: "error", message: "Failed to delete contribution" };
    }
  }

  export async function prepareOCRValidation(user_id: string) {
    try {
        const response = await fetch(`http://localhost:8000/prepare_five_ocr_validations/${user_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        

        const ocrContribution = await response.json();
        console.log("created Validation data:", ocrContribution);
        return { status: "success", message: "Validation created successfully" };
    } catch (error) {
        console.log("validation error >>>>>>>>>>>>>>>>>>>>>>>>>>>>",error)
        console.error("Error updating Validation:", error);
        return { status: "error", message: "Failed to update Validation" };
    }
}


export async function deleteValidation(
    validationId: string
  ): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(
        `http://localhost:8000/delete_ocr_validation/${validationId}/`,
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

export async function updateOCRValidation( id:string, boolValue:boolean ) {
    console.log("heloo : >>>>>>>>>>>", id, boolValue)
    // const END_POINT = import.meta.env.API_ENDPOINT
    console.log()
    try {
        const response = await fetch(`http://localhost:8000/update_ocr_validation/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    validation_id: id,
                    is_valid: boolValue
                }
            ),
        });
        // if (!response.ok) {
        //     throw new Error("Failed to update contribution");
        // }

        const updatedValidation = await response.json();
        console.log("Updated Validation", updatedValidation);
        return { status: "success", message: "OCR validation updated successfully" };
    } catch (error) {
        console.error("Error updating validation:", error);
        return { status: "error", message: "Failed to update validation" };
    }
}

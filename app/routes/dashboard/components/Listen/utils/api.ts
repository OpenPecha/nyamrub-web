export async function contributeListen( contribution_id:string, text:string ) {
    // const END_POINT = import.meta.env.API_ENDPOINT
    console.log()
    try {
        const response = await fetch(`http://localhost:8000/update_sst_contribution/`, {
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

export async function deleteContribution(
    contributionId: string
  ): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(
        `http://localhost:8000/delete_stt_contribution/${contributionId}/`,
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
        `http://localhost:8000/delete_stt_validation/${validationId}/`,
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
  
  export async function updateListenValidation( id:string, boolValue:boolean ) {
    // const END_POINT = import.meta.env.API_ENDPOINT
    console.log()
    try {
        const response = await fetch(`http://localhost:8000/update_stt_validation/`, {
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

        const updatedContribution = await response.json();
        console.log("Updated Contribution:", updatedContribution);
        return { status: "success", message: "Contribution updated successfully" };
    } catch (error) {
        console.error("Error updating contribution:", error);
        return { status: "error", message: "Failed to update contribution" };
    }
}

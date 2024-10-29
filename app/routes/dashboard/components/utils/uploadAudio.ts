import axios from "axios";

export default async function uploadFile(file: File): Promise<{ status: string; message: string }> {
  try {
    let formData = new FormData();
    let filename = file?.name ? file?.name : "recording";

    let uniqueFilename = Date.now() + "-" + filename + ".mp3";
    formData.append("filename", uniqueFilename);
    formData.append("filetype", file.type);
    formData.append("bucket", "/BashaDan/speak");

    const response = await axios.post("/api/get_presigned_url", formData);
    const { url } = response.data;
    // Use Axios to upload the file to S3
    const uploadStatus = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    if (uploadStatus.status === 200) {
      const uploadedFilePath = uploadStatus.request.responseURL;
      const baseUrl = uploadedFilePath?.split("?")[0]!;
      console.log("base url",baseUrl)
      return { status: "success", message: "File uploaded successfully" };
    }
  } catch (error) {
    console.error(`Error uploading file ${file.name}:`, error);
    return { status: "error", message: `Error uploading file: ${error}` };
  }
};


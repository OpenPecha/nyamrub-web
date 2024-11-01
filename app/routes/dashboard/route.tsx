import ContactUs from "../_index/components/ContactUs";
import Footer from "../_index/components/Footer";
import Sidebar from "./components/Sidebar";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  console.log("userid ", user_id);
  const url = new URL(request.url);

  const SourceType = url.searchParams.get("q");
  console.log(SourceType)
  let contribRes = [];
  let validationRes = [];
  switch (SourceType) {
    case "Speak":
      contribRes = await apiCall(
        "show_tts_data_to_contributor",
        API_ENDPOINT,
        user_id
      );
      validationRes = await apiCall(
        "show_tts_data_and_contribution_to_validator",
        API_ENDPOINT,
        user_id
      );
      break;

    case "Listen":
      contribRes = await apiCall(
        "show_stt_data_to_contributor",
        API_ENDPOINT,
        user_id
      );
      validationRes = await apiCall(
        "show_stt_data_and_contribution_to_validator",
        API_ENDPOINT,
        user_id
      );
      break;
    case "Write":
      contribRes = await apiCall(
        "show_mt_data_to_contributor",
        API_ENDPOINT,
        user_id
      );
      validationRes = await apiCall(
        "show_mt_data_and_contribution_to_validator",
        API_ENDPOINT,
        user_id
      );
      break;
      case "OCR":
      contribRes = await apiCall(
        "show_ocr_data_to_contributor",
        API_ENDPOINT,
        user_id
      );
      validationRes = await apiCall(
        "show_ocr_data_and_contribution_to_validator",
        API_ENDPOINT,
        user_id
      );
      break;
  }

  const res = { contribution: contribRes, validation: validationRes, user_id: user_id  };
  return json(res);
};

const apiCall = async (api: string, endpoint: string, user_id: string) => {
  const url = `${endpoint}/${api}/${user_id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json(); // Ensure you parse the response as JSON
  } catch (err) {
    console.error("API call error:", err);
    return []; // Return an empty array in case of an error
  }
};

export default function route() {
  return (
    <div className="bg-white">
      <Sidebar />
      <ContactUs />
      <Footer />
    </div>
  );
}

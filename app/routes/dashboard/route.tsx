import ContactUs from "../_index/components/ContactUs";
import Footer from "../_index/components/Footer";
import Sidebar from "./components/Sidebar";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const user_id = user?.user_id;

  // switch (SourceType) {
  //   case "Speak":
  //     contribRes = await apiCall(
  //       "show_tts_data_to_contributor",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     validationRes = await apiCall(
  //       "show_tts_data_and_contribution_to_validator",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     break;

  //   case "Listen":
  //     contribRes = await apiCall(
  //       "show_stt_data_to_contributor",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     validationRes = await apiCall(
  //       "show_stt_data_and_contribution_to_validator",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     break;
  //   case "Write":
  //     contribRes = await apiCall(
  //       "show_mt_data_to_contributor",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     validationRes = await apiCall(
  //       "show_mt_data_and_contribution_to_validator",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     break;
  //     case "OCR":
  //     contribRes = await apiCall(
  //       "show_ocr_data_to_contributor",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     validationRes = await apiCall(
  //       "show_ocr_data_and_contribution_to_validator",
  //       API_ENDPOINT,
  //       user_id
  //     );
  //     break;
  //   default:
  //     break;
  // }\]

  return json([]);
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

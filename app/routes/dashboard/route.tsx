import ContactUs from "../_index/components/ContactUs";
import Footer from "../_index/components/Footer";
import Sidebar from "./components/Sidebar";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  console.log("userid " ,user_id);
  const url = new URL(request.url);

  const SourceType = url.searchParams.get("q");
  let contribRes = [];
  let validationRes = [];
  switch (SourceType) {
    case "Speak":
      contribRes = await apiCall("get_tts_contributions", API_ENDPOINT, user_id);
      validationRes = await apiCall("get_tts_data_and_contribution", API_ENDPOINT, user_id);
      break;

    case "Listen":
      contribRes = await apiCall("get_stt_contributions_by_id", API_ENDPOINT, user_id);
      validationRes = await apiCall("get_tts_data_and_contribution", API_ENDPOINT, user_id);
      break;
  }

  const res = { 'contribution': contribRes, 'validation': validationRes };
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
    console.error('API call error:', err);
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

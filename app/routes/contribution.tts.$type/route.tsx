import { Link, useParams } from "@remix-run/react";
import SpeakComponent from "./components/SpeakComponent";
import ValidateAudio from "./components/Validate";
import { getGuestUserSession, getUserSession } from "~/services/session.server";
import { LoaderFunction } from "@remix-run/node";
import fetchData from "../../utils/fetchData";

export const loader: LoaderFunction = async ({ request, params }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const guest_user = await getGuestUserSession(request);
  const user_id = user ? user.user_id : guest_user?.user_id;
  const type = params.type;
  const url =
    type === "contribute"
      ? `${API_ENDPOINT}/show_tts_data_to_contributor/${user_id}`
      : `${API_ENDPOINT}/show_tts_data_and_contribution_to_validator/${user_id}`;
  const data = await fetchData(url);
  return { data, user_id };
};

export default function route() {
  const { type } = useParams();
  return (
    <div className="flex flex-col items-center w-full h-full">
          {type === "contribute" ? <SpeakComponent /> : <ValidateAudio />}
        </div>
  );
}

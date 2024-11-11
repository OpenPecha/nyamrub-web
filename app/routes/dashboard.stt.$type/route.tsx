import { useState } from "react";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { Link, Outlet, useParams } from "@remix-run/react";
import ListenComponent from "./components/ListenComponent";
import ValidateListen from "./components/ValidateListen";
import { LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";
import fetchData from "../../utils/fetchData";

export const loader: LoaderFunction = async ({ request, params }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  console.log("userid ", user_id);
  const type = params.type;
  const url =
    type === "contribution"
      ? `${API_ENDPOINT}/show_stt_data_to_contributor/${user_id}`
      : `${API_ENDPOINT}/show_stt_data_and_contribution_to_validator/${user_id}`;
  const data = await fetchData(url);
  return { data, user_id };
};

export default function route() {
  const { type } = useParams();
  return (
    <div className="flex flex-col items-center w-full h-fit">
      <div className="w-full min-w-3xl">
        <h1 className="text-2xl font-semibold mb-2 text-primary-900 uppercase"></h1>
        <p className="mb-6 text-neutral-900 text-sm font-medium">
          སྒྲ་ཡིག་འབེབ་བྱས་ཏེ་གསུང་རྒྱུན་སྣ་ཚོགས་སྲུང་སྐྱོབ་བྱེད།
        </p>

        <div className="flex space-x-4">
          <Link
            to="/dashboard/stt/contribution"
            className={`py-1.5 px-4 border-x border-t border-primary-900  rounded-t-lg ${
              type === "contribution"
                ? "bg-primary-700 text-white"
                : "bg-primary-200 text-primary-900"
            }`}
          >
            <div className="text-left font-lg font-medium">ཡིག་འབེབ།</div>
          </Link>
          <Link
            to="/dashboard/stt/validation"
            className={`py-1.5 px-4 border-x border-t border-primary-900 rounded-t-lg ${
              type === "validation"
                ? "bg-primary-700 text-white"
                : "bg-primary-200 text-primary-900"
            }`}
          >
            <div className="text-left font-lg font-medium">ཞུ་དག</div>
            {/* <div className="text-xs">Validate other's contribution</div> */}
          </Link>
        </div>

        <div className="bg-primary-200 p-6 border border-primary-900 shadow-sm h-full">
          {type === "contribution" ? <ListenComponent /> : <ValidateListen />}
        </div>
      </div>
    </div>
  );
}

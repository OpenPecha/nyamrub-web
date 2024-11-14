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
    type === "contribute"
      ? `${API_ENDPOINT}/show_stt_data_to_contributor/${user_id}`
      : `${API_ENDPOINT}/show_stt_data_and_contribution_to_validator/${user_id}`;
  const data = await fetchData(url);
  return { data, user_id };
};

export default function route() {
  const { type } = useParams();
  return (
    <div className="flex flex-col items-center w-full h-full">
      {type === "contribute" ? <ListenComponent /> : <ValidateListen />}
    </div>
  );
}

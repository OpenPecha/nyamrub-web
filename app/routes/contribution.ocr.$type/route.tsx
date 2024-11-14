import { useState } from "react";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { Link, Outlet, useParams } from "@remix-run/react";
import { getUserSession } from "~/services/session.server";
import { LoaderFunction } from "@remix-run/node";
import fetchData from "../../utils/fetchData";
import OcrComponent from "./components/OcrComponent";
import ValidateOcr from "./components/ValidateOcr";

export const loader: LoaderFunction = async ({ request, params }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  console.log("userid ", user_id);
  const type = params.type;
  const url =
    type === "contribute"
      ? `${API_ENDPOINT}/show_ocr_data_to_contributor/${user_id}`
      : `${API_ENDPOINT}/show_ocr_data_and_contribution_to_validator/${user_id}`;
  const data = await fetchData(url);
  return { data, user_id };
};

export default function route() {
  const { type } = useParams();

  return (
    <div className="flex flex-col items-center w-full h-full">
        {type === "contribute" ? <OcrComponent /> : <ValidateOcr />}

    </div>
  );
}

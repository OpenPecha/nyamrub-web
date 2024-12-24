import { useState } from "react";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { Link, Outlet, useParams } from "@remix-run/react";
import { getGuestUserSession, getUserSession } from "~/services/session.server";
import { LoaderFunction } from "@remix-run/node";
import fetchData from "../../utils/fetchData";
import OcrComponent from "./components/OcrComponent";
import ValidateOcr from "./components/ValidateOcr";

export const loader: LoaderFunction = async ({ request, params }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const url = new URL(request.url);
  const domain = url.hostname;
  const isLocal = domain === "localhost";

  const auth = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    host: isLocal ? "http://" + domain + ":3000" : "https://" + domain,
  };
  const user = await getUserSession(request);
  const guest_user = await getGuestUserSession(request);
  const currentUser = user ? user : guest_user;
  const type = params.type;
  const endpoint =
    type === "contribute"
      ? `${API_ENDPOINT}/show_ocr_data_to_contributor/${currentUser?.user_id}`
      : `${API_ENDPOINT}/show_ocr_data_and_contribution_to_validator/${currentUser?.user_id}`;
  const data = await fetchData(endpoint);
  return { data, currentUser, auth };
};

export default function route() {
  const { type } = useParams();

  return (
    <div className="flex flex-col items-center w-full h-full">
        {type === "contribute" ? <OcrComponent /> : <ValidateOcr />}

    </div>
  );
}

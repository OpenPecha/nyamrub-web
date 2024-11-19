import { Link, useParams } from "@remix-run/react";
import { getUserSession } from "~/services/session.server";
import { LoaderFunction } from "@remix-run/node";
import WriteComponent from "./components/WriteComponent";
import ValidateSegment from "./components/ValidateSegmentText";
import fetchData from "../../utils/fetchData";
import TestComponent from "./components/TestComponent";

export const loader: LoaderFunction = async ({ request, params }) => {
  const API_ENDPOINT: string | undefined = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  const type = params.type;
  const url =
    type === "contribute"
      ? `${API_ENDPOINT}/show_mt_data_to_contributor/${user_id}`
      : `${API_ENDPOINT}/show_mt_data_and_contribution_to_validator/${user_id}`;
  const data = await fetchData(url);
  return { data, user_id };
};

export default function route() {
  const { type } = useParams();

  return (
    <div className="flex flex-col items-center w-full h-full">
      {type === "contribute" ? <WriteComponent /> : <ValidateSegment />}
    </div>
  );
}

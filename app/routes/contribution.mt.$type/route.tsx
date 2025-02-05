import { Await, defer, useAsyncError, useLoaderData, useParams } from "@remix-run/react";
import { getGuestUserSession, getUserSession } from "~/services/session.server";
import { LoaderFunction } from "@remix-run/node";
import WriteComponent from "./components/WriteComponent";
import ValidateSegment from "./components/ValidateSegmentText";
import fetchData from "../../utils/fetchData";
import { Suspense } from "react";
import SkeletonFallback from "./components/SkeletonFallback";

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
  const currentUser = user ? user : await getGuestUserSession(request);
  const type = params.type;
  const endpoint =
    type === "contribute"
      ? `${API_ENDPOINT}/mt/contributor/${currentUser?.user_id}/data`
      : `${API_ENDPOINT}/mt/validator/${currentUser?.user_id}/data`;
  const data_promise = await fetchData(endpoint);
  return defer({ data_promise, currentUser, auth });
};

export default function route() {
  const { type } = useParams();
  const { data_promise } = useLoaderData()
  
  if(!data_promise) return <div>not data </div>;
  return (
    <Suspense fallback={<SkeletonFallback />}>
      <Await resolve={data_promise} errorElement={<HandleError/>}>
        {(data) => (
          <div className="flex flex-col items-center w-full h-full">
            {type === "contribute" ? (
              <WriteComponent write_contributions={data} />
            ) : (
              <ValidateSegment write_validation={data} />
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
}

function HandleError() {
  const error = useAsyncError();
  console.log("errer :::: ",error)
  return <div>{error.message}</div>;
}
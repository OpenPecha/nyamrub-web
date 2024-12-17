import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { createUser } from "~/services/getUserDetail.server";
import { commitSession, getGuestUserSession, getSession } from "~/services/session.server";
import { useAuth0 } from "~/Hooks/useAuth";
import LoadingSpinner from "~/components/LoadingSpinner";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const domain = url.hostname;
  const isLocal = domain === "localhost";
  const auth = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    host: isLocal ? "http://" + domain + ":3000" : "https://" + domain,
  };
  return auth;
};

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const userValue = formdata.get("user") as string;
  let user = JSON.parse(userValue);
  const session = await getSession(request.headers.get("Cookie"));
  const guestUser = await getGuestUserSession(request);
  if (!user) return null;
  user = { ...user, is_guest: false, user_id: guestUser?.user_id };
  let user_id = await createUser(user, request);
  if(!user_id){
    throw new Error('user not create')
  }
  const new_user = { ...user, user_id:user_id };
  session.set("user", new_user);
  session.unset("guest_user");
  //check if skipped

  //in not skipped
  return redirect("/contribution/mt/contribute", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

function Route() {
  const data = useLoaderData();
  const auth0Config = {
    domain: data?.domain,
    clientID: data?.clientId,
    redirectUri: data?.host + "/callback",
    responseType: "token id_token",
  };
  const { handleAuthentication } = useAuth0(auth0Config);

  const startAuth = async () => {
    await handleAuthentication();
  };

  useEffect(() => {
    startAuth();
  }, []);
  return (
    <div className="flex items-center justify-center h-[calc(100vh-90px)] bg-primary-100 ">
      <div className="text-primary-950 text-2xl">
        <LoadingSpinner />
      </div>
    </div>
  );
}

export default Route;

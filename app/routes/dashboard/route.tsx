import React, { useEffect } from "react";
import ContactUs from "../_index/components/ContactUs";
import Footer from "../_index/components/Footer";
import Sidebar from "./components/Sidebar";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const user = await getUserSession(request);
  const user_id = user?.user_id;
  console.log("userid " ,user_id);
  const url = new URL(request.url);

  let SourceType = url.searchParams.get("q");
  let res;
  switch (SourceType) {
    case "Speak":
      const speakType = [
        "get_tts_contributions",
        "get_tts_data_and_contribution"
      ];
      res = await api_call(speakType, API_ENDPOINT, user_id);
      break;
    case "Listen":
      const listenType = ["get_stt_contributions_by_id"];
      res = await api_call(listenType, API_ENDPOINT, user_id);
      break;
    case "Write":
      const writeType = ["show_mt_data_to_contributor", "show_mt_data_and_contribution_to_validator"];
      res = await api_call(writeType, API_ENDPOINT, user_id);
      break
  }

  return json({ user: res });
};

const api_call = async (type: [string], endpoint: string, user_id: string) => {
  const apis = type.map((t) => {
    return `${endpoint}/${t}/${user_id}`;
  });

  const responses = await Promise.all(
    apis.map((endpoint) =>
      fetch(endpoint).then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return res.json();
      })
    )
  );
  return responses;
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

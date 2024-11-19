import React from "react";
import Profile from "./components/Profile";
import Table from "./components/Table";
import ContributionDetail from "./components/OverallProgress";
import EachContribution from "./components/EachContribution";
import OverallProgress from "./components/OverallProgress";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const API_ENDPOINT = process.env.API_ENDPOINT;

  if (!API_ENDPOINT) {
    throw new Response("API endpoint not configured", { status: 500 });
  }

  const user = await getUserSession(request);

  if (!user || !user.user_id) {
    throw new Response("Unauthorized: User not found", { status: 401 });
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/user_contributions/${user.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch contributions: ${response.statusText}`);
    }

    const contributions = await response.json();
    return json({ user, contributions });
  } catch (error) {
    console.error("Error fetching contributions:", error);
    throw new Response("Error fetching contributions", { status: 500 });
  }
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-10 grid-rows-3 px-10 pb-5 gap-2 bg-primary-50 h-full">
      <div className="col-span-6 bg-white shadow-md inset-0 rounded-xl overflow-hidden place-content-center">
        <Profile />
      </div>
      <div className="col-span-4 bg-white shadow-md inset-0 rounded-xl overflow-hidden place-content-center"> 
        <OverallProgress />
      </div>
      <div className="row-span-2 col-span-6 bg-white shadow-md inset-0 rounded-xl overflow-hidden">
        <Table />
      </div>
      <EachContribution />
    </div>
  );
}

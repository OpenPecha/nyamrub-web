import Profile from "./components/Profile";
import Table from "./components/Table";
import EachContribution from "./components/EachContribution";
import OverallProgress from "./components/OverallProgress";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";
import { fetcherLeaderboarData } from "~/services/leaderboardData";
import LeaderBoardTour from "~/components/LeaderBoardTour";

export const loader: LoaderFunction = async ({ request }) => {
 const user = await getUserSession(request);

  if (!user) {
    return redirect("/");
  }
 const userData = await fetcherLeaderboarData(user);
 return json(userData);
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-10 grid-rows-6 md:grid-rows-3 px-3 md:px-10 pb-5 md:pb-2 gap-2 bg-primary-50 min-h-[calc(100vh-90px)]">
      <div className="col-span-full row-span-1 bg-white shadow-md inset-0 rounded-xl overflow-hidden place-content-center">
        <Profile />
      </div>
      {/* <div className="col-span-full lg:col-span-4 row-span-1 bg-white shadow-md inset-0 rounded-xl overflow-hidden place-content-center">
         <OverallProgress /> 
      </div> */}
      <div
        className="col-span-full md:col-span-6 row-span-2 bg-white shadow-md inset-0 rounded-xl overflow-auto"
        id="step-12"
      >
        <Table />
      </div>
      <EachContribution />
      <LeaderBoardTour />
    </div>
  );
}

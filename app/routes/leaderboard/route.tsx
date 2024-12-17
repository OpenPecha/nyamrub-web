import Profile from "./components/Profile";
import Table from "./components/Table";
import EachContribution from "./components/EachContribution";
import OverallProgress from "./components/OverallProgress";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";
import { fetcherLeaderboarData } from "~/services/leaderboardData";

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
    <div className="grid grid-cols-10 grid-rows-3 px-10 pb-5 gap-2 bg-primary-50 h-[calc(100vh-90px)]">
      <div className="col-span-full md:col-span-6 bg-white shadow-md inset-0 rounded-xl overflow-hidden place-content-center">
        <Profile />
      </div>
      <div className="col-span-full md:col-span-4 bg-white shadow-md inset-0 rounded-xl overflow-hidden place-content-center">
        <OverallProgress />
      </div>
      <div className="row-span-2 col-span-full md:col-span-6 bg-white shadow-md inset-0 rounded-xl overflow-hidden">
        <Table />
      </div>
      <EachContribution />
    </div>
  );
}

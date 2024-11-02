import React from "react";
import Table from "./Table";
import Profile from "./Profile";
import Badge from "./Badge";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex-1 flex-col">
        <Profile />
        <Table />
      </div>

      <Badge />
    </div>
  );
}

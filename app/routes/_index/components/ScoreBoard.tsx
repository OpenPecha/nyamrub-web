// Leaderboard.jsx
import { useLoaderData } from "@remix-run/react";
import React from "react";

const users = [
  {
    rank: 1,
    name: "Tenzin Monlam",
    username: "@Monlamai",
    score: 18000,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    bgColor: "bg-primary-600",
  },
  {
    rank: 2,
    name: "Tenzin Kalden",
    username: "@Kalden12",
    score: 15300,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80", // replace with actual avatar image
    bgColor: "bg-neutral-500",
  },
  {
    rank: 3,
    name: "Tenzin Rangdol",
    username: "@rangz000",
    score: 12000,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80", // replace with actual avatar image
    bgColor: "bg-primary-950",
  },
  {
    rank: 4,
    name: "Tenzin Padma",
    username: "@Padma3",
    score: 11000,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80", // replace with actual avatar image
    bgColor: "bg-transparent",
  },
  {
    rank: 5,
    name: "Tenzin Pema",
    username: "@Lotus12",
    score: 10000,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80", // replace with actual avatar image
    bgColor: "bg-transparent",
  },
];

const ScoreBoard = () => {
  const loaderData = useLoaderData();
  const users = loaderData?.topContributors || [];
  return (
    <div className="ml-16 rounded-tl-3xl border-t border-l  border-primary-900  bg-gradient-to-r from-primary-50 to-primary-150  overflow-hidden">
      <table className="table-auto w-full text-left">
        <thead className="text-primary-900 text-sm">
          <tr>
            <th className="px-4 py-4">Rank</th>
            <th className="px-4 py-4">User name</th>
            <th className="px-4 py-4 text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr
              key={user.rank}
              className="border-t border-primary-700 hover:bg-gradient-to-r from-primary-100 to-primary-300"
            >
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${
                      index == 0
                        ? "bg-primary-600 text-neutral-950"
                        : index === 1
                        ? "bg-neutral-500 text-neutral-950"
                        : index === 2
                        ? "bg-primary-950 text-primary-400"
                        : "bg-transparent text-primary-950"
                    }
                 `}
                  >
                    {index + 1}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <img
                    src={user.profile_image_url}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-4"
                  />
                  <div>
                    <div className="text-gray-800 font-semibold text-sm">
                      {user.name}
                    </div>
                    <div className="text-gray-500 text-xs">@{user.username}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-right font-semibold text-gray-700">
                {user.score}
              </td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan={3} className="border-t border-primary-700 hover:bg-gradient-to-r from-primary-100 to-primary-300 py-4 text-center">
                No user available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;

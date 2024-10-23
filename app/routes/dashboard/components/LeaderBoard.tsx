export function Leaderboard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Overall Leaderboard</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Rank</th>
            <th className="py-2">Contribution</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Tenzin Monlam", rank: 1, contribution: "100,000" },
            { name: "Tenzin Passang", rank: 2, contribution: "200,000" },
            { name: "Tenzin Kalsang", rank: 3, contribution: "102,200" },
            { name: "Tenzin Chalung", rank: 4, contribution: "900,000" },
            { name: "Tenzin Pema", rank: 5, contribution: "200,000" },
          ].map((user, index) => (
            <tr key={index}>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.rank}</td>
              <td className="py-2">{user.contribution}</td>
            </tr>
          ))}
          <tr>
            <td className="py-2">Your Rank</td>
            <td>-</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

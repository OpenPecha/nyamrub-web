export function ContributionStats() {
  const tasks = [
    { title: "Write", count: 0 },
    { title: "OCR", count: 0 },
    { title: "Speak", count: 0 },
    { title: "Listen", count: 0 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-2 gap-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="p-4 bg-beige-100 rounded-lg flex justify-between items-center"
        >
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.count} Total Contribution</p>
        </div>
      ))}
    </div>
  );
}

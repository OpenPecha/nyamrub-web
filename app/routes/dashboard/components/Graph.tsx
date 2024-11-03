import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  const data = {
    labels: ["English", "Tibetan"],
    datasets: [
      {
        label: "Selected Language",
        data: [20, 50], // Contribution values for English and Tibetan
        backgroundColor: ["#b38e22", "#5c4b28"],
        barThickness: 70, // Thickness of the bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#000",
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Contributions in English and Tibetan",
          color: "#000", // X-axis title color
          font: {
            size: 14,
          },
        },
        grid: {
          display: false, // Removes X-axis grid line
        },
      },
      y: {
        title: {
          display: true,
          text: "Contribution (total sentences)", // Y-axis label
          color: "#000",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false, // Removes Y-axis grid line
        },
        border: {
          display: false, // Removes Y-axis line
        },
      },
    },
  };

  return (
    <div className="hidden md:block">
      <div className="text-primary-950 text-xl font-medium mx-10">
        Contribution Tracker
      </div>
      <div className="text-neutral-900 text-sm mx-10">
        Contributions in English and Tibetan
      </div>
      <div className="bg-primary-200 p-10 border m-10">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

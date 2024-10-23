import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          family: "Poppins",
          size: 12,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const label = tooltipItem.label || "";
          const value = tooltipItem.raw || 0;
          return `${label}: ${value} Alarms`;
        },
      },
    },
  },
};

// Sample alarm data for critical and warning alarms
const data = {
  labels: ["Critical Alarms", "Warning Alarms"], // Labels for the doughnut chart
  datasets: [
    {
      label: "Alarm Count",
      data: [45, 30], // Example data: 45 critical alarms, 30 warning alarms
      backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"], // Colors for the segments
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => {
  return (
    <div className="text-sm font-medium tracking-wider text-gray-700 capitalize ">
      <p className="pb-5">Sensor Alarm</p>
      <div className="h-52">
        <Doughnut options={options} data={data} />{" "}
        {/* Pass the data prop here */}
      </div>
    </div>
  );
};

export default DoughnutChart;

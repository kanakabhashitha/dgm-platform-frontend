import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "", // Updated title
    },
    legend: {
      display: false, // Hiding the legend, tooltip will show alarm breakdown
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const { datasetIndex, raw } = tooltipItem;
          const label =
            datasetIndex === 0 ? "Critical Alarms: " : "Warning Alarms: ";
          return label + raw;
        },
        afterLabel: function (tooltipItem) {
          const totalAlarms = tooltipItem.raw;
          return `Total Alarms: ${totalAlarms}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time (Hours)", // X-axis label
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: "Total Alarm Count", // Y-axis label
      },
      ticks: {
        beginAtZero: true, // Alarm count starts at 0
      },
      grid: {
        display: true,
      },
    },
  },
};

// Data for critical and warning alarms
const criticalAlarms = [
  0, 3, 1, 5, 2, 1, 0, 2, 4, 1, 0, 0, 0, 3, 1, 2, 0, 1, 0, 1, 2, 1, 0, 0,
];
const warningAlarms = [
  2, 1, 0, 0, 1, 2, 3, 1, 0, 0, 1, 2, 0, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 2,
];

// Calculate total alarms for each hour
const totalAlarms = criticalAlarms.map(
  (critical, index) => critical + warningAlarms[index]
);

// Updated data with total alarms as Y-axis and tooltip showing breakdown
const data = {
  labels: [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
  datasets: [
    {
      label: "Total Alarms", // This dataset shows the total alarms (sum of critical and warning)
      data: totalAlarms, // Total alarm counts for each hour
      borderColor: "rgba(75, 192, 192, 1)", // Line color for total alarms
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};

export default LineChart;

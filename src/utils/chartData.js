export const SensorData = {
  labels: ["Critical Alarms", "Warning Alarms"],
  datasets: [
    {
      label: "# of Votes",
      data: [35, 20],
      backgroundColor: ["#4CADAD", "#99D0D0"],
      borderColor: ["#008B8A"],
      borderWidth: 1,
      cutout: "70%",
    },
  ],
};

export const DeviceData = {
  labels: ["Sensor Fault", "Need Calibrate", "Warmup"],
  datasets: [
    {
      label: "# of Votes",
      data: [3, 2, 1],
      backgroundColor: ["#4CADAD", "#99D0D0", "rgba(153, 208, 208, 0.22)"],
      borderColor: ["#008B8A"],
      borderWidth: 1,
      cutout: "70%",
    },
  ],
};

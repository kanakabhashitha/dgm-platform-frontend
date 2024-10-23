import React from "react";

const RealTimeAlarmTable = ({ data }) => {
  return (
    <table className="w-full text-sm text-center capitalize border border-collapse border-gray-200 table-auto">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="p-4">Sensor Name</th>
          <th>Level</th>
          <th>Value</th>
          <th>Date & Time</th>
          <th className="p-4">Acknowledge</th>
        </tr>
      </thead>
      <tbody>
        {data.map((organization, orgIndex) =>
          organization.groups.map((group, groupIndex) =>
            group.gateways.map((gateway, gatewayIndex) => {
              const sensorData = gateway.sensorData || [];
              const filteredSensorData = sensorData.filter(
                (sensor) =>
                  sensor.level === "Critical" || sensor.level === "Warning"
              );

              return filteredSensorData.map((sensor, sensorIndex) => (
                <tr
                  key={`${orgIndex}-${groupIndex}-${gatewayIndex}-${sensorIndex}`}
                  className="text-sm border-b"
                >
                  <td className="p-2 border">
                    {sensor.name || "Unknown Sensor"}
                  </td>
                  <td className="p-2 border">{sensor.level || "N/A"}</td>
                  <td className="p-2 border">{sensor.value || "N/A"}</td>
                  <td className="p-2 border">
                    {new Date(sensor.timestamp).toLocaleString() || "N/A"}
                  </td>
                  <td className="p-2 border">
                    <button className="px-3 py-0.5 text-sm capitalize tracking-wider text-white bg-yellow-500 border border-yellow-600 rounded-sm  hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105">
                      Ack
                    </button>
                  </td>
                </tr>
              ));
            })
          )
        )}
      </tbody>
    </table>
  );
};

export default RealTimeAlarmTable;

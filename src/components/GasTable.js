import React from "react";

const GasTable = ({ data }) => {
  return (
    <table className="w-full text-sm tracking-wider text-center capitalize border border-collapse border-gray-200 table-auto">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="p-4">Sensor Name</th>
          <th>Address</th>
          <th>Unit</th>
          <th>Location</th>
          <th>Active</th>
          <th>Status</th>
          <th>Level</th>
          <th>Value</th>
          <th>Date&Time</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sensor) => (
          <tr key={sensor.id}>
            <td className="pt-2 pb-2 ">{sensor.name || "Unknown"}</td>
            <td>{sensor.location || "N/A"}</td>
            <td>{sensor.unit || "N/A"}</td>
            <td>{sensor.location || "N/A"}</td>
            <td>{sensor.active ? "Inactive" : "Active"}</td>
            <td>{sensor.status || "N/A"}</td>
            <td>{sensor.level || "N/A"}</td>
            <td>{sensor.value || "N/A"}</td>
            <td>{new Date(sensor.timestamp).toLocaleString() || "N/A"}</td>
            <td className="p-2">
              <button className="px-2 py-0.5 text-sm capitalize tracking-wider text-white bg-cyan-md border border-cyan rounded-sm  hover:bg-cyan transition-transform duration-300 transform ">
                info
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GasTable;

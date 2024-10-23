import React from "react";

import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

function GroupTable({ data }) {
  return (
    <table className="w-full text-sm text-center capitalize border border-collapse border-gray-200 table-auto">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="p-4">Group Name</th>
          <th>Organization Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Status</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((group) => (
          <tr key={group.id} className="text-sm border-b">
            <td className="p-2 border ">{group.name}</td>
            <td className="p-2 border">{group.organizationName}</td>
            <td className="p-2 border">{group.latitude}</td>
            <td className="p-2 border">{group.longitude}</td>
            <td className="p-2 border">
              {group.isActive ? "Active" : "Inactive"}
            </td>
            <td className="p-2 border">
              {new Date(group.createdDate).toLocaleDateString()}
            </td>
            <td className="p-2 border">
              {new Date(group.updatedDate).toLocaleDateString()}
            </td>
            <td>
              <button className="p-1 text-base text-white border rounded-sm border-cyan bg-cyan-md hover:text-black">
                <AiOutlineFolderOpen />
              </button>
              <button className="p-1 ml-1 mr-1 text-base text-white bg-yellow-500 border border-yellow-600 rounded-sm hover:text-black">
                <AiOutlineEdit />
              </button>
              <button className="p-1 text-base text-white bg-red-500 border border-red-600 rounded-sm hover:text-black">
                <MdOutlineDeleteOutline />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GroupTable;

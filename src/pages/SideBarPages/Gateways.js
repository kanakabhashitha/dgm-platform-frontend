import React, { useEffect } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { loadGatewayData } from "../../store/gateway";

import { DataTable } from "../../components/index";

function Gateways() {
  const dispatch = useDispatch();
  const { gateways, loading, error } = useSelector((state) => state.gateway);

  useEffect(() => {
    dispatch(loadGatewayData());
  }, []);

  const columns = [
    { label: "Gateway Name", accessor: "gatewayName" },
    { label: "Client Id", accessor: "clientId" },
    { label: "Serial Number", accessor: "serialNumber" },
    {
      label: "Connection Status",
      accessor: "status",
    },
    {
      label: "Active Status",
      accessor: (row) => (row.isActive ? "Active" : "Inactive"),
    },
    {
      label: "Created Date",
      accessor: (row) => moment(row.createdAt).format("MMMM Do YYYY, h:mm a"),
    },
    {
      label: "Updated Date",
      accessor: (row) => moment(row.updatedAt).format("MMMM Do YYYY, h:mm a"),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="p-4 bg-white shadow-md">
        <div className="flex items-center gap-5 text-sm tracking-wider text-black form">
          <div className="flex items-center space-x-3">
            <label>Gateway Name</label>
            <input
              type="text"
              placeholder="gateway name"
              className="py-1 text-center border border-gray-300 rounded-sm focus:outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label>Serial Number</label>
            <input
              type="text"
              placeholder="serial number"
              className="py-1 text-center border border-gray-300 rounded-sm focus:outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <button className="px-3 py-1 text-sm tracking-wider text-white border rounded-sm border-cyan bg-cyan-md hover:bg-cyan">
            Filter
          </button>
        </div>
      </div>

      <div className="p-4 bg-white shadow-md">
        <DataTable
          columns={columns}
          data={gateways?.data || []}
          isShowActionSection={true}
          isShowViewBtn={true}
          isShowEditBtn={true}
          isShowDeleteBtn={true}
        />
      </div>
    </div>
  );
}

export default Gateways;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRealTimeData } from "../../store/deviceData";

import { GasTable, TreeView } from "../../components/index";
import {
  RiBankLine,
  RiBaseStationLine,
  RiOrganizationChart,
  RiFolderWarningLine,
} from "react-icons/ri";

function RealTimeMonitoring() {
  const dispatch = useDispatch();
  const { realTimeData, loading, error, selectedGatewaysFromTreeView } =
    useSelector((state) => state.device);

  useEffect(() => {
    dispatch(loadRealTimeData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(realTimeData);

  if (!realTimeData || realTimeData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex h-full">
      <section className="w-auto px-5 py-3 bg-white shadow-md flex-items-center">
        <TreeView data={realTimeData} />
      </section>

      <section className="flex-grow p-4 overflow-auto">
        {selectedGatewaysFromTreeView.length <= 0 && (
          <div className="flex flex-col items-center gap-2 mt-4 font-medium ">
            <RiFolderWarningLine className="text-3xl text-gray-400" />
            <div className="text-sm tracking-wider text-gray-400">
              Please select the gateway
            </div>
          </div>
        )}

        {realTimeData.map((organization, orgIndex) =>
          organization.groups.map((group, groupIndex) =>
            group.gateways
              .filter((gateway) =>
                selectedGatewaysFromTreeView.includes(gateway.gatewayId)
              )
              .map((gateway, gatewayIndex) => {
                const sensorData = gateway.sensorData || [];

                return (
                  <div
                    key={`${orgIndex}-${groupIndex}-${gatewayIndex}`}
                    className="p-3 mb-4 bg-white shadow-md"
                  >
                    {/* Title section */}
                    <div className="flex gap-5 px-2 py-2 border border-gray-300">
                      <div className="flex gap-2 w-fit place-items-center">
                        <div className="p-0.5 border-2 rounded-full text-sm bg-cyan-sm border-cyan">
                          <RiBankLine />
                        </div>
                        <div className="text-sm font-medium tracking-wider text-cyan">
                          Organization :
                        </div>
                        <span className="text-sm font-medium tracking-wider text-black">
                          {organization.organizationName ||
                            "Unknown Organization"}
                        </span>
                      </div>

                      <div className="flex gap-2 w-fit place-items-center">
                        <div className="p-0.5 border-2 rounded-full text-sm bg-cyan-sm border-cyan">
                          <RiOrganizationChart />
                        </div>
                        <div className="text-sm font-medium tracking-wider text-cyan">
                          Group :
                        </div>
                        <span className="text-sm font-medium tracking-wider text-black">
                          {group.groupName || "Unknown Group"}
                        </span>
                      </div>

                      <div className="flex gap-2 w-fit place-items-center">
                        <div className="p-0.5 border-2 rounded-full text-sm bg-cyan-sm border-cyan">
                          <RiBaseStationLine />
                        </div>
                        <div className="text-sm font-medium tracking-wider text-cyan">
                          Gateway :
                        </div>
                        <span className="text-sm font-medium tracking-wider text-black">
                          {gateway.gatewayName || "Unknown Gateway"}
                        </span>
                      </div>
                    </div>

                    {/* Table */}
                    {sensorData.length === 0 ? (
                      <div className="flex flex-col items-center justify-center gap-1 mt-4 font-medium">
                        <RiFolderWarningLine className="text-2xl text-gray-400" />
                        <div className="text-sm tracking-wider text-gray-400">
                          No sensor data available
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center mt-4 tracking-wider">
                        <GasTable data={sensorData} />
                      </div>
                    )}
                  </div>
                );
              })
          )
        )}
      </section>
    </div>
  );
}

export default RealTimeMonitoring;

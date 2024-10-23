import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRealTimeData } from "../../store/deviceData";

import { GasTable, RealTimeAlarmTable } from "../../components/index";
import {
  RiGroup3Line,
  RiBaseStationLine,
  RiOrganizationChart,
} from "react-icons/ri";

function RealTimeMonitoring() {
  const dispatch = useDispatch();
  const { realTimeData, loading, error } = useSelector((state) => state.device);

  useEffect(() => {
    dispatch(loadRealTimeData());
  }, [dispatch]);

  useEffect(() => {}, [realTimeData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!realTimeData || realTimeData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid h-screen grid-cols-9 gap-5 p-5 mb-16 scroll-smooth focus:scroll-auto">
      <section className="flex flex-col col-span-6 gap-4">
        {realTimeData.map((organization, orgIndex) =>
          organization.groups.map((group, groupIndex) =>
            group.gateways.map((gateway, gatewayIndex) => {
              const sensorData = gateway.sensorData || [];

              if (sensorData.length === 0) return null;

              return (
                <div
                  key={`${orgIndex}-${groupIndex}-${gatewayIndex}`}
                  className="gap-4 p-3 bg-white shadow-md"
                >
                  {/* Title section */}
                  <div className="flex gap-5 px-2 py-2 border border-gray-300">
                    <div className="flex gap-2 w-fit place-items-center">
                      <div className="p-0.5 border-2 rounded-full text-sm bg-cyan-sm border-cyan">
                        <RiOrganizationChart />
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
                        <RiGroup3Line />
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
                  <div className="flex items-center justify-center mt-4">
                    <GasTable data={sensorData} />
                  </div>
                </div>
              );
            })
          )
        )}
      </section>

      <section className="flex flex-col items-center col-span-3 ">
        <div className="flex items-center justify-center w-full p-3 bg-white shadow-md">
          <RealTimeAlarmTable data={realTimeData} />
        </div>
      </section>
    </div>
  );
}

export default RealTimeMonitoring;

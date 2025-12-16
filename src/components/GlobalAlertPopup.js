import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import moment from "moment";

import { hidePopup, showPopup } from "../store/popup";
import { loadRealTimeData } from "../store/deviceData";

import {
  RiBaseStationLine,
  RiCloseLine,
  RiAlarmWarningLine,
  RiOrganizationChart,
} from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { BiMapPin } from "react-icons/bi";

function GlobalAlertPopup() {
  const dispatch = useDispatch();
  const { isShowPopup } = useSelector((state) => state.popup);
  const { realTimeData } = useSelector((state) => state.device);

  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  useEffect(() => {
    dispatch(loadRealTimeData());
  }, [dispatch]);

  useEffect(() => {
    const alertData = realTimeData.flatMap((org) =>
      org.groups.flatMap((group) =>
        group.gateways.flatMap((gateway) =>
          gateway.sensorData
            .filter(
              (sensor) =>
                sensor.level === "Critical" || sensor.level === "Warning"
            )
            .map((sensor) => ({
              organizationName: org.organizationName,
              groupName: group.groupName,
              gatewayName: gateway.gatewayName,
              ...sensor,
            }))
        )
      )
    );

    setFilteredAlerts(alertData);
    if (alertData.length > 0) {
      dispatch(showPopup());
    } else {
      dispatch(hidePopup());
    }
  }, [realTimeData, dispatch]);

  if (!isShowPopup || filteredAlerts.length === 0) return null;

  const selectedAlert = filteredAlerts[selectedTab];

  const cancelAlert = (index) => {
    const newAlerts = filteredAlerts.filter((_, i) => i !== index);
    setFilteredAlerts(newAlerts);
    setSelectedTab((prev) => (prev > 0 ? prev - 1 : 0));
    if (newAlerts.length === 0) {
      dispatch(hidePopup());
    }
  };

  return (
    <Draggable>
      <div className="fixed right-0 z-50 h-auto transform -translate-y-1/2 bg-white rounded-sm shadow shadow-gray-400 top-1/3 w-96">
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-2 rounded-tl-sm rounded-tr-sm cursor-move bg-cyan">
          <div className="flex items-center gap-4">
            <span className="mb-1 text-xl font-medium text-white">
              <RiAlarmWarningLine />
            </span>
            <p className="font-medium tracking-wider text-white capitalize">
              Alarm Information
            </p>
          </div>
          <div
            onClick={() => dispatch(hidePopup())}
            className="p-0.5 text-lg text-white border border-white rounded-sm hover:bg-red-500 hover:border-red-500 cursor-pointer"
          >
            <RiCloseLine />
          </div>
        </div>

        {/* Tabs for each gateway */}
        <div className="p-2">
          <div className="flex">
            {filteredAlerts.map((alert, index) => (
              <div
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`z-30 px-3 py-1 text-sm font-medium tracking-wide cursor-pointer shadow-black rounded-tl-md rounded-tr-md ${
                  selectedTab === index
                    ? "bg-cyan-xsm font-medium"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {alert.name}
              </div>
            ))}
          </div>

          {/* Content for selected gateway tab */}
          <div className="px-3 py-2 rounded-tr rounded-bl rounded-br bg-cyan-xsm">
            <div className="flex grid-cols-4 gap-2 py-2">
              <InfoCard
                icon={<RiOrganizationChart />}
                label="Group"
                value={selectedAlert.groupName}
              />

              <InfoCard
                icon={<RiBaseStationLine />}
                label="Gateway"
                value={selectedAlert.gatewayName}
              />

              <InfoCard
                icon={<BiMapPin />}
                label="Location"
                value={selectedAlert.location}
              />
            </div>

            <div
              className={`flex items-center my-2 bg-white border-l-4 rounded-sm  ${
                selectedAlert.level === "Critical"
                  ? "border-l-red-500"
                  : "border-l-yellow-500"
              }`}
            >
              <div
                className={`p-4 text-3xl ${
                  selectedAlert.level === "Critical"
                    ? "bg-red-300"
                    : "bg-yellow-300"
                }`}
              >
                <IoWarningOutline />
              </div>
              <div className="pl-2 text-sm tracking-wide text-left">
                <span className="font-medium">{selectedAlert.level}</span>
                <span className="font-medium"> : </span>
                {selectedAlert.name} <span> levels have reached </span>{" "}
                {selectedAlert.value}
                {selectedAlert.unit} <span> as of </span>
                {moment(selectedAlert.timestamp).format("MMMM Do YYYY, h:mm a")}
              </div>
            </div>

            {/* Button Group */}
            <div className="flex gap-3 pt-1">
              <button className="px-2 py-1 mt-3 mb-1 text-sm font-normal tracking-wide text-white border rounded-sm hover:bg-cyan bg-cyan-md border-cyan">
                Acknowledge
              </button>

              <button
                onClick={() => cancelAlert(selectedTab)}
                className="px-2 py-1 mt-3 mb-1 text-sm font-normal tracking-wide border rounded-sm text-cyan hover:text-white hover:bg-cyan border-cyan"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center w-full col-span-1 gap-1 p-2 bg-white rounded-md">
      <div className="pb-2 text-xl">{icon}</div>
      <p className="text-sm font-medium text-center capitalize">{label}</p>
      <p className="text-sm font-normal text-center capitalize">{value}</p>
    </div>
  );
}

export default GlobalAlertPopup;

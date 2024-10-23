import React, { useState } from "react";
import { LineChart, DoughnutChart } from "../../components/index";

import { RiGroup3Line, RiBaseStationLine } from "react-icons/ri";
import { MdSensors, MdSensorsOff } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState("daily");

  return (
    <div className="flex flex-col h-full p-4">
      {/* button group */}
      <div className="flex items-center justify-between">
        {/* title */}
        <p className="text-base font-medium tracking-wider text-black">
          Dashboard
        </p>

        <div className="flex items-center justify-end gap-2">
          <button
            className={`px-2 py-1.5 text-xs font-semibold tracking-wider uppercase border border-gray-300 rounded-md border-1 hover:bg-cyan hover:text-white ${
              activeButton === "daily"
                ? "bg-cyan text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveButton("daily")}
          >
            daily
          </button>

          <button
            className={`px-2 py-1.5 text-xs font-semibold tracking-wider uppercase border border-gray-300 rounded-md border-1 hover:bg-cyan hover:text-white ${
              activeButton === "weekly"
                ? "bg-cyan text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveButton("weekly")}
          >
            weekly
          </button>

          <button
            className={`px-2 py-1.5 text-xs font-semibold tracking-wider uppercase border rounded-md border-gray-300 border-1 hover:bg-cyan hover:text-white ${
              activeButton === "monthly"
                ? "bg-cyan text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveButton("monthly")}
          >
            monthly
          </button>
        </div>
      </div>

      {/* card group */}
      <div className="flex gap-5 py-4">
        {/* card */}
        <div className="flex items-center w-full py-4 bg-white rounded-md shadow-md justify-evenly">
          <div className="p-3 bg-blue-500 rounded-full">
            <div className="p-2 text-xl text-blue-500 bg-white rounded-full">
              <RiGroup3Line />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 ml-5">
            <p className="text-base font-normal tracking-wider text-gray-700 capitalize">
              total groups
            </p>
            <span className="text-4xl font-semibold text-black">5</span>
          </div>
        </div>

        {/* card */}
        <div className="flex items-center justify-center w-full py-4 bg-white rounded-md shadow-md">
          <div className="p-3 bg-green-600 rounded-full">
            <div className="p-2 text-xl text-green-600 bg-white rounded-full">
              <RiBaseStationLine />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 ml-5">
            <p className="text-base font-normal tracking-wider text-gray-700 capitalize">
              total gateways
            </p>
            <span className="text-4xl font-semibold text-black">5</span>
          </div>
        </div>

        {/* card */}
        <div className="flex items-center justify-center w-full py-4 bg-white rounded-md shadow-md">
          <div className="p-3 rounded-full bg-cyan-md">
            <div className="p-2 text-xl bg-white rounded-full text-cyan-md">
              <MdSensors />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 ml-5">
            <p className="text-base font-normal tracking-wider text-gray-700 capitalize">
              total sensors
            </p>
            <span className="text-4xl font-semibold text-black">5</span>
          </div>
        </div>

        {/* card */}
        <div className="flex items-center justify-center w-full py-4 bg-white rounded-md shadow-md">
          <div className="p-3 rounded-full bg-rose-500">
            <div className="p-2 text-xl bg-white rounded-full text-rose-500">
              <MdSensorsOff />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 ml-5">
            <p className="text-base font-normal tracking-wider text-gray-700 capitalize">
              device failures
            </p>
            <span className="text-4xl font-semibold text-black">5</span>
          </div>
        </div>

        {/* card */}
        <div className="flex items-center justify-center w-full py-4 bg-white rounded-md shadow-md">
          <div className="p-3 bg-orange-500 rounded-full">
            <div className="p-2 text-xl text-orange-500 bg-white rounded-full">
              <LuBellRing />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 ml-5">
            <p className="text-base font-normal tracking-wider text-gray-700 capitalize">
              sensor alarms
            </p>
            <span className="text-4xl font-semibold text-black">5</span>
          </div>
        </div>
      </div>

      <div className="grid h-full grid-cols-10 gap-4">
        <section className="flex flex-col justify-center col-span-7 p-4 bg-white rounded-md shadow-md">
          <p className="text-sm font-medium tracking-wider text-gray-700 capitalize ">
            Alarm Trend Over 24 Hours
          </p>
          <div className="flex items-center justify-center h-full">
            <LineChart />
          </div>
        </section>

        <section className="flex flex-col col-span-3 gap-4">
          <div className="h-full p-4 bg-white rounded-md shadow-md">
            <DoughnutChart />
          </div>
          <div className="h-full p-4 bg-white rounded-md shadow-md">
            <DoughnutChart />
          </div>
        </section>

        {/* space */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Dashboard;

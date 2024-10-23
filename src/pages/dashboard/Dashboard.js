import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loadHistoricalData } from "../../store/deviceData";
import { LineChart, DoughnutChart } from "../../components/index";

import { RiGroup3Line, RiBaseStationLine } from "react-icons/ri";
import { MdSensors, MdSensorsOff } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";

import { SensorData, DeviceData } from "../../utils/chartData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { historicalData, totalPages, itemsPerPage, loading, error } =
    useSelector((state) => state.device);

  const [activeButton, setActiveButton] = useState("daily");
  const [criticalCount, setCriticalCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [sensorFaultCount, setSensorFaultCount] = useState(0);
  const [needCalibrateCount, setNeedCalibrateCount] = useState(0);
  const [warmupCount, setWarmupCount] = useState(0);

  useEffect(() => {
    fetchAllData();

    // const intervalId = setInterval(() => {
    //   dispatch(loadHistoricalData(1, 50));
    // }, 20000);

    // return () => clearInterval(intervalId);
  }, [dispatch, totalPages]);

  const fetchAllData = async () => {
    let critical = 0;
    let warning = 0;
    let sensorFault = 0;
    let needCalibrate = 0;
    let warmup = 0;

    for (let page = 1; page <= totalPages; page++) {
      const criticalItems = historicalData.filter(
        (item) => item.level === "Critical"
      ).length;
      const warningItems = historicalData.filter(
        (item) => item.level === "Warning"
      ).length;
      const sensorFaultItems = historicalData.filter(
        (item) => item.status === "Sensorfault"
      ).length;

      const needCalibrateItems = historicalData.filter(
        (item) => item.status === "Need Calibrate"
      ).length;

      const warmupItems = historicalData.filter(
        (item) => item.status === "Warmup"
      ).length;

      critical += criticalItems;
      warning += warningItems;
      sensorFault += sensorFaultItems;
      needCalibrate += needCalibrateItems;
      warmup += warmupItems;

      await dispatch(loadHistoricalData(page, 50));
    }

    console.log(warning);

    setCriticalCount(critical);
    setWarningCount(warning);
    setSensorFaultCount(sensorFault);
    setNeedCalibrateCount(needCalibrate);
    setWarmupCount(warmup);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            yesterday
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
            <span className="text-4xl font-semibold text-black">1</span>
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
            <span className="text-4xl font-semibold text-black">1</span>
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
            <span className="text-4xl font-semibold text-black">9</span>
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
            <span className="text-4xl font-semibold text-black">6</span>
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
            <span className="text-4xl font-semibold text-black">55</span>
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
            <DoughnutChart title="Sensor Alarms" data={SensorData} />
          </div>
          <div className="h-full p-4 bg-white rounded-md shadow-md">
            <DoughnutChart title="Device Failures Alarms" data={DeviceData} />
          </div>
        </section>

        {/* space */}
        <div className="p-4"></div>
      </div>
    </div>
  );
};

export default Dashboard;

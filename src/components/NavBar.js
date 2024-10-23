import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdOutlineDashboard } from "react-icons/md";
import { RiAlarmWarningLine, RiUser3Line } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaChartLine } from "react-icons/fa6";
import { TbHeartRateMonitor } from "react-icons/tb";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const linkClass = (path) =>
    pathname === path ? "text-white" : "text-gray-300 hover:text-white";

  const saveTabToLocalStorage = (path, label) => {
    const storedTabs = JSON.parse(localStorage.getItem("tabs")) || [];
    if (!storedTabs.some((tab) => tab.path === path)) {
      storedTabs.push({ path, label });
      localStorage.setItem("tabs", JSON.stringify(storedTabs));
    }
  };

  useEffect(() => {
    saveTabToLocalStorage(pathname, pathname.replace("/", "") || "Dashboard");
  }, [pathname]);

  return (
    <nav className="p-5 bg-cyan">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center gap-10">
          <img
            className="w-28"
            alt="logo"
            src={require("../assets/images/logo-with-name.png")}
          />
          <ul className="flex items-center space-x-4">
            <li
              className={`flex items-center gap-2 tracking-wide text-base ${linkClass(
                "/"
              )}`}
            >
              <MdOutlineDashboard />
              <NavLink to="/">Dashboard</NavLink>
            </li>

            <li
              className={`flex items-center gap-2 tracking-wide text-base ${linkClass(
                "/real-time-monitoring"
              )}`}
            >
              <TbHeartRateMonitor />
              <NavLink to="/real-time-monitoring">Real Time-Monitoring</NavLink>
            </li>

            <li
              className={`flex items-center gap-2 tracking-wide text-base ${linkClass(
                "/alarms"
              )}`}
            >
              <RiAlarmWarningLine className="mb-0.5" />
              <NavLink to="/alarms">Alarms</NavLink>
            </li>

            <li
              className={`flex items-center gap-2 tracking-wide text-base ${linkClass(
                "/reports"
              )}`}
            >
              <FaChartLine />
              <NavLink to="/reports">Reports</NavLink>
            </li>

            <li className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-2 tracking-wide text-base focus:outline-none ${linkClass(
                  "/management"
                )}`}
              >
                <AiOutlineSetting />
                Managements
                <IoMdArrowDropdown
                  className={`transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`absolute mt-3 w-max bg-white rounded shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
                  dropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <li>
                  <NavLink
                    to="/group-management"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Group Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/gateway-management"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Gateway Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sensor-management"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sensor Management
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between space-x-5 text-white">
          <div className="flex items-center justify-center gap-2 pt-1 pb-1 pl-2 pr-2 tracking-wide">
            <div className="pt-1 pb-1 pl-2 pr-2 text-sm bg-blue-400 rounded-sm">
              <span>Alarms - 0</span>
            </div>
            <div className="pt-1 pb-1 pl-2 pr-2 text-sm bg-red-500 rounded-sm">
              <span>C - 0</span>
            </div>
            <div className="pt-1 pb-1 pl-2 pr-2 text-sm bg-yellow-500 rounded-sm">
              <span>W - 0</span>
            </div>
          </div>
          <div className="flex items-center justify-center text-lg">
            <span className="pr-1 text-sm tracking-wide capitalize">
              Hi, {user.userName}
            </span>
            <RiUser3Line className="cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

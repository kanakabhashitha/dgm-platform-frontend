import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { IoCloseCircleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const TopBar = () => {
  const defaultTab = { path: "/", label: "Dashboard" };
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([defaultTab]);

  // Load tabs from local storage on mount
  useEffect(() => {
    const storedTabs = JSON.parse(localStorage.getItem("tabs")) || [defaultTab];
    setTabs(storedTabs);
  }, []);

  // Sync local storage with the current tabs state
  const updateLocalStorage = (newTabs) => {
    localStorage.setItem("tabs", JSON.stringify(newTabs));
  };

  // Handle tab click
  const handleTabClick = (path, label) => {
    if (!tabs.some((tab) => tab.path === path)) {
      const newTabs = [...tabs, { path, label }];
      setTabs(newTabs);
      updateLocalStorage(newTabs); // Sync with local storage
    }
    navigate(path);
  };

  // Close tab functionality
  const closeTab = (path) => {
    if (path === defaultTab.path) return; // Prevent closing the default tab

    const updatedTabs = tabs.filter((tab) => tab.path !== path);
    updateLocalStorage(updatedTabs); // Sync with local storage before updating state
    setTabs(updatedTabs); // Update state

    // Navigate to the last remaining tab or the Dashboard
    if (pathname === path) {
      if (updatedTabs.length > 0) {
        navigate(updatedTabs[updatedTabs.length - 1].path);
      } else {
        navigate("/"); // Navigate to Dashboard if no tabs are left
      }
    }
  };

  // Add tab when the pathname changes
  useEffect(() => {
    if (!tabs.some((tab) => tab.path === pathname) && pathname !== "/") {
      const label = pathname.replace("/", "").replace("-", " ");
      const newTabs = [...tabs, { path: pathname, label }];
      setTabs(newTabs);
      updateLocalStorage(newTabs); // Sync with local storage
    }
  }, [pathname]);

  return (
    <div className="flex items-center justify-between h-10 border shadow-sm shadow-gray-200">
      <ul className="flex">
        {tabs.map((tab) => (
          <li
            key={tab.path}
            className="flex items-center pt-2 pb-2 pl-5 pr-5 border-t border-r border-gray-300 rounded-tl-sm rounded-tr-sm shadow-sm"
          >
            <NavLink
              to={tab.path}
              onClick={() => handleTabClick(tab.path, tab.label)}
              className={`flex items-center text-gray-900 capitalize text-sm tracking-wide ${
                pathname === tab.path
                  ? "font-semibold text-cyan"
                  : "hover:text-cyan"
              }`}
            >
              {tab.label}
            </NavLink>
            {/* Render close button only if it's not the default tab */}
            {tab.path !== defaultTab.path && (
              <button
                onClick={() => closeTab(tab.path)}
                className="ml-2 text-gray-400 hover:text-red-400"
                aria-label={`Close ${tab.label}`}
              >
                <IoCloseCircleOutline size={14} />
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center h-full pl-4 pr-4 text-lg border-l-2 cursor-pointer">
        <IoSettingsOutline />
      </div>
    </div>
  );
};

export default TopBar;

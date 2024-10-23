import React from "react";
import { Outlet } from "react-router-dom";

import { NavBar, TopBar, BottomBar } from "../../components/index";

const SharedLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <TopBar />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
};

export default SharedLayout;

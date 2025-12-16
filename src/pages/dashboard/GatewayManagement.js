import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import links from "../../utils/links";

const GatewayManagement = () => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <div className="flex h-full">
      <SideBar ids={[2, 3]} onTabSelect={setActiveTab} />{" "}
      <div className="flex-grow p-4 overflow-auto">
        {links.find((link) => link.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default GatewayManagement;

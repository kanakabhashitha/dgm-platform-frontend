import React, { useState } from "react";

import SideBar from "../../components/SideBar";
import links from "../../utils/links";

const GroupManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex h-full">
      <SideBar setActiveTab={setActiveTab} activeTab={activeTab} ids={[1, 2]} />
      <div className="flex-grow p-4 overflow-auto">
        {links[activeTab].content}
      </div>
    </div>
  );
};

export default GroupManagement;

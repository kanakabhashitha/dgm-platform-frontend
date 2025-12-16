import React, { useState } from "react";
import links from "../utils/links";

const SideBar = ({ ids, onTabSelect }) => {
  const [activeTab, setActiveTab] = useState(ids[0]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    onTabSelect(id);
  };

  const filteredLinks = links.filter((link) => ids.includes(link.id));

  return (
    <div className="h-full pt-5 bg-white shadow-md w-60">
      {filteredLinks.map((link) => (
        <div
          key={link.id}
          className={`flex items-center p-2 mt-0 mb-2 ml-3 mr-3 tracking-wider text-gray-700 capitalize rounded-md cursor-pointer gap-x-4 
            ${
              activeTab === link.id
                ? "bg-cyan text-white"
                : "hover:bg-cyan hover:text-white"
            }`}
          onClick={() => handleTabClick(link.id)}
        >
          <span className="text-xl">{link.icon}</span>
          <span className="text-sm font-medium">{link.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SideBar;

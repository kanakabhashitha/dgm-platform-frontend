import React from "react";
import links from "../utils/links";

const SideBar = ({ setActiveTab, activeTab, ids }) => {
  const filteredLinks = links.filter((link) => ids.includes(link.id));

  return (
    <div className="h-full pt-5 bg-white shadow-md w-60">
      {filteredLinks.map((link, index) => (
        <div
          key={link.id}
          className={`flex items-center p-2 mt-0 mb-2 ml-3 mr-3 tracking-wider text-gray-700 capitalize rounded-md cursor-pointer gap-x-4 
            ${
              activeTab === index
                ? "bg-cyan text-white"
                : "hover:bg-cyan hover:text-white"
            }`}
          onClick={() => setActiveTab(index)}
        >
          <span className="text-xl">{link.icon}</span>
          <span className="text-sm font-medium">{link.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SideBar;

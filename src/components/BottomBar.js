import React from "react";

const BottomBar = () => {
  return (
    <div className="absolute bottom-0 flex w-full gap-6 pt-1.5 pb-1.5 pl-4 pr-4 bg-white shadow-inner shadow-gray-200">
      <div className="text-sm tracking-wide">
        DGM : <span>Administrator</span>
      </div>
      <div className="text-sm tracking-wide">
        Last Data Received : <span>2014:10:24</span>
      </div>
    </div>
  );
};

export default BottomBar;

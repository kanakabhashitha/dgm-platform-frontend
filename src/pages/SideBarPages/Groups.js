import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loadGroup } from "../../store/Group";

import { GroupTable } from "../../components/index";

function Groups() {
  const dispatch = useDispatch();
  const { groups, loading, error } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(loadGroup());
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="p-4 bg-white shadow-md">
        <div className="flex items-center gap-5 text-sm tracking-wider text-black form">
          <div className="flex items-center space-x-3">
            <label>Group Name</label>
            <input
              type="text"
              placeholder="group name"
              className="py-1 text-center border border-gray-300 rounded-sm focus:outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label>Organization Name</label>
            <input
              type="text"
              placeholder="organization name"
              className="py-1 text-center border border-gray-300 rounded-sm focus:outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <button className="px-3 py-1 text-sm tracking-wider text-white border rounded-sm border-cyan bg-cyan-md hover:bg-cyan">
            Filter
          </button>
        </div>
      </div>
      <div className="p-4 bg-white shadow-md">
        <GroupTable data={groups} />
      </div>
    </div>
  );
}

export default Groups;

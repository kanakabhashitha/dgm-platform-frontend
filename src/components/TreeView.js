import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedGatewaysToTreeView } from "../store/deviceData";
import {
  RiBaseStationLine,
  RiOrganizationChart,
  RiBankLine,
} from "react-icons/ri";
import { PiPlusSquareLight, PiMinusSquareLight } from "react-icons/pi";

function TreeView({ data }) {
  const dispatch = useDispatch();

  const initialCheckedItems = {};
  let initialSelectedGateways = [];

  if (
    data.length > 0 &&
    data[0].groups.length > 0 &&
    data[0].groups[0].gateways.length > 0
  ) {
    const firstGatewayId = data[0].groups[0].gateways[0].gatewayId;
    initialCheckedItems[firstGatewayId] = true;
    initialSelectedGateways = [firstGatewayId];
  }

  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
  const [selectedGateways, setSelectedGateways] = useState(
    initialSelectedGateways
  );

  useEffect(() => {
    dispatch(setSelectedGatewaysToTreeView(selectedGateways));
  }, [selectedGateways, dispatch]);

  const handleCheckboxChange = (
    id,
    isChecked,
    type,
    relatedIds = [],
    groupIds = []
  ) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems, [id]: isChecked };

      if (type === "organization" && isChecked) {
        groupIds.forEach((groupId) => {
          updatedCheckedItems[groupId] = true;
        });
      } else if (type === "organization" && !isChecked) {
        groupIds.forEach((groupId) => {
          updatedCheckedItems[groupId] = false;
        });
      }
      relatedIds.forEach((relatedId) => {
        updatedCheckedItems[relatedId] = isChecked;
      });
      return updatedCheckedItems;
    });

    setSelectedGateways((prevSelectedGateways) => {
      if (isChecked) {
        const newGateways = relatedIds.filter(
          (gatewayId) => !prevSelectedGateways.includes(gatewayId)
        );
        return [...prevSelectedGateways, ...newGateways];
      } else {
        return prevSelectedGateways.filter(
          (gatewayId) => !relatedIds.includes(gatewayId)
        );
      }
    });
  };

  return (
    <ul className="w-full text-sm tracking-wider">
      {data.map((organization) => (
        <OrganizationNode
          key={organization.organizationId}
          organization={organization}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
    </ul>
  );
}

function OrganizationNode({
  organization,
  checkedItems,
  handleCheckboxChange,
}) {
  const [expanded, setExpanded] = useState(false);
  const isChecked = !!checkedItems[organization.organizationId];

  const relatedGatewayIds = organization.groups.flatMap((group) =>
    group.gateways.map((gateway) => gateway.gatewayId)
  );
  const groupIds = organization.groups.map((group) => group.groupID);

  const handleExpand = () => setExpanded(!expanded);

  return (
    <li className="relative">
      <div className="flex items-center cursor-pointer">
        <span onClick={handleExpand} className="mr-2 cursor-pointer">
          {expanded ? <PiMinusSquareLight /> : <PiPlusSquareLight />}
        </span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) =>
            handleCheckboxChange(
              organization.organizationId,
              e.target.checked,
              "organization",
              relatedGatewayIds,
              groupIds
            )
          }
          className="mr-3 accent-cyan"
        />
        <span className="mr-2 text-xl">
          <RiBankLine />
        </span>
        <span className="font-base">{organization.organizationName}</span>
      </div>

      {expanded && (
        <ul className="mt-3 space-y-3 border-l-2 border-gray-300">
          {organization.groups.map((group) => (
            <GroupNode
              key={group.groupID}
              group={group}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function GroupNode({ group, checkedItems, handleCheckboxChange }) {
  const [expanded, setExpanded] = useState(false);
  const isChecked = !!checkedItems[group.groupID];

  const relatedGatewayIds = group.gateways.map((gateway) => gateway.gatewayId);

  const handleExpand = () => setExpanded(!expanded);

  return (
    <li className="relative">
      <div className="flex items-center cursor-pointer">
        <hr className="w-6 border border-gray-300" />
        <span onClick={handleExpand} className="mr-2 cursor-pointer">
          {expanded ? <PiMinusSquareLight /> : <PiPlusSquareLight />}
        </span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) =>
            handleCheckboxChange(
              group.groupID,
              e.target.checked,
              "group",
              relatedGatewayIds
            )
          }
          className="mr-3 accent-cyan"
        />
        <span className="mr-2 text-lg">
          <RiOrganizationChart />
        </span>
        <span>{group.groupName}</span>
      </div>

      {expanded && (
        <ul className="mt-3 space-y-3">
          {group.gateways.map((gateway) => (
            <GatewayNode
              key={gateway.gatewayId}
              gateway={gateway}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function GatewayNode({ gateway, checkedItems, handleCheckboxChange }) {
  const isChecked = !!checkedItems[gateway.gatewayId];

  return (
    <li className="relative">
      <div className="flex items-center">
        <hr className="w-[4.5rem] mr-0.5 border border-gray-300" />
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) =>
            handleCheckboxChange(
              gateway.gatewayId,
              e.target.checked,
              "gateway",
              [gateway.gatewayId]
            )
          }
          className="mr-3 accent-cyan"
        />
        <span className="mr-2 text-base">
          <RiBaseStationLine />
        </span>
        {gateway.gatewayName}
      </div>
    </li>
  );
}

export default TreeView;

import React from "react";

import {
  Groups,
  AddGroups,
  Gateways,
  AddGateways,
} from "../pages/SideBarPages/index";

import { VscGroupByRefType } from "react-icons/vsc";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { RiBaseStationLine } from "react-icons/ri";

const links = [
  {
    id: 0,
    text: "Groups",
    icon: <VscGroupByRefType />,
    content: <Groups />,
  },
  {
    id: 1,
    text: "Add Groups",
    icon: <MdOutlineLibraryAdd />,
    content: <AddGroups />,
  },
  {
    id: 2,
    text: "Gateways",
    icon: <RiBaseStationLine />,
    content: <Gateways />,
  },
  {
    id: 3,
    text: "Assign Gateways",
    icon: <MdOutlineLibraryAdd />,
    content: <AddGateways />,
  },
];

export default links;

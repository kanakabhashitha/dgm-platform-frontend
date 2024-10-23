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
    id: 1,
    text: "Groups",
    icon: <VscGroupByRefType />,
    content: <Groups />,
  },
  {
    id: 2,
    text: "Add Groups",
    icon: <MdOutlineLibraryAdd />,
    content: <AddGroups />,
  },
  {
    id: 3,
    text: "Gateways",
    icon: <RiBaseStationLine />,
    content: <Gateways />,
  },
  {
    id: 4,
    text: "Add Gateways",
    icon: <MdOutlineLibraryAdd />,
    content: <AddGateways />,
  },
];

export default links;

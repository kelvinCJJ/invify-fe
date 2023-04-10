import { useTheme } from "@mui/material";
import { useState } from "react";
//import { tokens } from "../../theme";
import {
  AnalyticsOutlined,
  Category,
  CategoryTwoTone,
  Dashboard,
  Inventory2,
  Settings,
  VerifiedUser,
} from "@mui/icons-material";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import Link from "next/link";
import Logo from "./Logo";
import Topbar from "./Navbar";
import { useStateContext } from "@/contexts/ContextProvider";
import ActiveLink from "./ActiveLink";

const Sidebar = ({ children }) => {
  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex flex-row space-x-3 cursor-pointer my-auto p-3 m-3 rounded-lg text-xs lg:text-base";
  const normalLink =
    "flex flex-row space-x-3 hover:bg-slate-500 hover:text-gray-100 cursor-pointer my-auto p-3 m-3 rounded-lg text-xs lg:text-base";

  return (
    <div>
      {activeMenu && (
        <>
          <div className="flex flex-col justify-between items-center">
            <div className="px-1 pt-4 rounded-lg ">
              <Link href="dashboard">
                <Logo className="bg-transparent" />
              </Link>
            </div>
            <div className="my-5">
              <ActiveLink
                href="/dashboard"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}  
                // className="flex flex-row space-x-3 hover:bg-pastel-blue hover:text-gray-100 cursor-pointer my-auto p-3 m-3 rounded-lg text-xs lg:text-base "
              >
                <Dashboard className="my-auto" />
                <p className="uppercase">Dashboard</p>
              </ActiveLink>

              <ActiveLink
                href="/product"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <Inventory2 className="my-auto" />
                <p className="uppercase">Products</p>
              </ActiveLink>
              <ActiveLink
                href="/product"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <Category className="my-auto" />
                <p className="uppercase">Category</p>
              </ActiveLink>
              <ActiveLink
                href="/sales"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <ReceiptOutlinedIcon className="my-auto" />
                <p className="uppercase">Sales</p>
              </ActiveLink>
              <ActiveLink
                href="/analytics"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <AnalyticsOutlined className="my-auto" />
                <p className="uppercase">Analytics</p>
              </ActiveLink>
            </div>
          </div>
        </>
      )}
      ;
    </div>
  );
};

export default Sidebar;

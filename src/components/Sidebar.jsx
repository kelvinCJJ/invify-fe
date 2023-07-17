import { useTheme } from "@mui/material";
import { useState } from "react";
//import { tokens } from "../../theme";
import {
  AnalyticsOutlined,
  Category,
  CategoryTwoTone,
  Dashboard,
  Inventory2,
  LogoutOutlined,
  ReceiptLong,
  Settings,
  Shop,
  Shop2,
  VerifiedUser,
  Warehouse,
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
import ActiveLink from "./ui/ActiveLink";

const Sidebar = ({ children, auth }) => {
  const theme = useTheme();
  const { activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex flex-row space-x-3 bg-darkaccent-700 p-3 h-12 items-center cursor-pointer text-base ";
  const normalLink =
    "flex flex-row space-x-3  hover:bg-darkaccent-700 items-center p-3 h-14 cursor-pointer text-base hover:bg-slate-500";

  return (
    <div className="w-full h-screen md:overflow-hidden overflow-auto h-min:h-24 md:hover:overflow-auto z-10">
      {activeMenu && (
        <>
          <div className="flex flex-col items-center">
            <div className="mx-2 my-1 rounded-lg ">
              <Link href="dashboard">
                <Logo className="bg-transparent" />
              </Link>
            </div>
            <div className="w-full items-center my-6">
              <ActiveLink
                href="/dashboard"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}  
              >
                <Dashboard  />
                <p >Dashboard</p>
              </ActiveLink>

              <ActiveLink
                href="/products"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <Inventory2  />
                <p >Products</p>
              </ActiveLink>
              <ActiveLink
                href="/sales"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <Shop  />
                <p >Sales</p>
              </ActiveLink>
              <ActiveLink
                href="/categories"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <Category  />
                <p >Categories</p>
              </ActiveLink>
              <ActiveLink
                href="/suppliers"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <Warehouse/>
                <p>Suppliers</p>
              </ActiveLink>
              <ActiveLink
                href="/purchases"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <ReceiptOutlinedIcon  />
                <p >Purchases</p>
              </ActiveLink>
              
              <ActiveLink
                href="/analytics"
                onClick={handleCloseSideBar}
                activeClassName={activeLink}
                className= {normalLink}                
              >
                <AnalyticsOutlined  />
                <p >Analytics</p>
              </ActiveLink>
            </div>
            
          </div>
        </>
      )}
      
    </div>
  );
};

export default Sidebar;

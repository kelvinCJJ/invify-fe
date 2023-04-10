// components/layout.js

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Tooltip } from "@mui/material";
import { SettingsApplications } from "@mui/icons-material";
import { useEffect } from "react";
import { useStateContext } from "@/contexts/ContextProvider";

export default function Layout({ children }) {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  return (
    <>
        <div className="flex flex-relative h-screen  md:overflow-hidden overflow-auto md:hover:overflow-auto">
          <div className="flex relative">
            {activeMenu ? (
              <div className="flex flex-col  w-24 md:w-44 lg:w-56 border-r-[1px] fixed bg-slate-800 ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 ">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? " bg-slate-800  min-h-screen md:ml-72 w-full  "
                  : " bg-slate-800  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static dark:bg-gray-800 navbar w-full ">
                <Navbar />
              </div>
              <main>{children}</main>
            </div>
            <Footer />
          </div>
        </div>
    </>
  );
}

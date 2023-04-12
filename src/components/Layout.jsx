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
        <div className="flex ">
          <div className="flex relative w-full">
            {activeMenu ? (
              <div className="flex flex-col items-center w-24 md:w-44 lg:w-56 border-r-[1px]  bg-slate-800 ">
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
                  ? " bg-slate-800  min-h-screen w-full"
                  : " bg-slate-800  min-h-screen w-full"
              }
            >
              <div className="static w-full">
                <Navbar />
              </div>
              <main className="m-5 px-4">{children}</main>
              <Footer/>
            </div>            
          </div>
        </div>
    </>
  );
}

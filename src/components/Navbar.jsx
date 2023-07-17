import { div, IconButton, Tooltip, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  DarkMode,
  LightMode,
  Logout,
  LogoutOutlined,
  Menu,
  MenuOpen,
  Notifications,
  PortraitRounded,
} from "@mui/icons-material";
import { useStateContext } from "@/contexts/ContextProvider";
import ActiveLink from "./ui/ActiveLink";
import { useRouter } from "next/router";
import axios from "axios";

const NavButton = ({ title, customFunc, icon, iconColor, addDot }) => {
  if (addDot == "true") {
    return (
      <Tooltip content={title} position="Center">
        <button
          type="button"
          onClick={() => customFunc()}
          className="relative self-center text-xl rounded-full p-1  hover:bg-light-gray"
        >
          <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 " />
          {icon}
        </button>
      </Tooltip>
    );
  }
  return (
    <Tooltip content={title} position="Center">
      <button
        type="button"
        onClick={() => customFunc()}
        className="relative self-center text-xl rounded-full p-1  hover:bg-light-gray"
      >
        {icon}
      </button>
    </Tooltip>
  );
};

const Navbar = ({ username }) => {
  const router = useRouter();
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  async function logout() {
    try {
      const user = await axios
        .get(process.env.AUTHURL + "/logout")
        .then((res) => {
          if (res.data.success == true) {
            localStorage.clear();
            router.push("/login");
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between items-center px-4 py-4 relative">
      <div className="flex flex-row mx-3 my-1 space-x-3">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          addDot="false"
          icon={<Menu />}
        />
        <div className="self-center">
          <h1 className="text-base">
            Welcome back, <strong>{username}</strong>
          </h1>
        </div>
      </div>
      <div className="flex mx-3 my-1 space-x-3">
        <NavButton
          title="Notification"
          addDot="true"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          icon={<NotificationsOutlinedIcon />}
        />
        <NavButton
          title="Logout"
          addDot="false"
          customFunc={() => logout()}
          icon={<LogoutOutlined />}
        />
      </div>
    </div>
  );
};

export default Navbar;

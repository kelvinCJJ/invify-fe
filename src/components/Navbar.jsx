import { div, IconButton, Tooltip, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
// import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { DarkMode, LightMode, MenuOpen, Notifications, PortraitRounded } from "@mui/icons-material";
import { useStateContext } from "@/contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      className="relative text-xl rounded-full p-3 bg-slate-700 hover:bg-light-gray"
    >
      <span
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 bg-white"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
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

  // useEffect(() => {
  //   const currentThemeColor = localStorage.getItem("colorMode");
  //   const currentThemeMode = localStorage.getItem("themeMode");
  //   if (currentThemeColor && currentThemeMode) {
  //     setCurrentColor(currentThemeColor);
  //     setCurrentMode(currentThemeMode);
  //   }
  // }, []);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between items-center px-4 py-4">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        icon={<MenuOpen />}
      />
      <div className="mx-2">
      <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} icon={<Notifications />} />
        
        <PortraitRounded />
      </div>
      
    </div>
  );
};

export default Navbar;

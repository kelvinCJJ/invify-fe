// components/layout.js

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Tooltip } from "@mui/material";
import { NavigateNext, SettingsApplications } from "@mui/icons-material";
import { useEffect } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { decode, verify } from "jsonwebtoken";
import process from "process";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import Snackbar from "./ui/Snackbar";
import axios from "axios";
const jwt = require("jsonwebtoken");

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.asPath;
  const [userName, setUserName] = useState("test");
  const { auth, setAuth } = useState(false);
  const { isTokenExpiredResult, setIsTokenExpiredResult } = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  function isTokenExpired(token) {
    const decodedToken = decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

  //get token
  function getToken() {
    const token = localStorage.getItem("token");
    return token;
  }


  //const sessionuser = localStorage.getItem("session_user");
  //Authentication context provider
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [sessionuser, setSessionuser] = useState({});

  

  const getUsername = () => {
    const user = localStorage.getItem("session_user")
      ? JSON.parse(localStorage.getItem("session_user"))
      : null;
    if (!user) {
      return;
    }
    setUserName(user.userName);
  };

  useEffect(() => {
    //console.log("useEffect");
    function getAuth() {
      try {
        const token = getToken();
        if (!token) {
          router.push("/login");
          return;
        }
        const isTokenExpiredResult = isTokenExpired(token);
        //console.log("tokenexpired: " + isTokenExpiredResult);
        if (isTokenExpiredResult) {
          router.push("/login");
        } else {
          setAuthenticated(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
    
    getAuth();
    getUsername();
  }, [router]);

  return (
    <>
      <div className="flex ">
        <div className="flex relative w-full">
          {activeMenu ? (
            <div className="items-center w-48 lg:w-56 border-r-[1px]  bg-darkshade-600 ">
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
                ? " bg-darkshade-600  min-h-screen w-full"
                : " bg-darkshade-600  min-h-screen w-full"
            }
          >
            <div className="static w-full">
              <Navbar username={userName} />
            </div>
            <main className="m-5 px-4">
              <div className="p-2">
                <Breadcrumbs path={path} />
              </div>

              <div className="sm:px-4 md:px-">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

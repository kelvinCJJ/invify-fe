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
const jwt = require("jsonwebtoken");

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.asPath;
  const[userName, setUserName] = useState('test');
  const { auth, setAuth } = useState(false);
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

  function currentToken() {
    const token = localStorage.getItem("token");
    return token;
  }
  
  async function getAuth() {
    try {      
      const token = currentToken();
      const isTokenExpiredResult = isTokenExpired(token);
      //console.log("tokenexpired: " + isTokenExpiredResult);
      if (token && isTokenExpiredResult) {
        const user = await axios
          .post(process.env.APIURL + "auth/login", values)
          .then((res) => {
            console.log(res.data);
            if (res.data.success == true && res.data.value) {
              const Uservalue = res.data.value;
              localStorage.setItem("session_user", Uservalue);
              localStorage.setItem("token", res.data.value.token);
              
              const tokenJson = jwt.verify(
                res.data.value.token,
                process.env.JWT_SECRET
              );
              console.log(tokenJson);
              setAuth(true);
              router.push("/dashboard");
            } else {
              setAuth(false);
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getUsername = () => {
    const user = localStorage.getItem('session_user') ? JSON.parse(localStorage.getItem('session_user')) : null;
    setUserName(user.userName);
  }

  useEffect(() => {
    getAuth();
    getUsername();
  }, []);
    // if (router.query.snackbar) {
    //   setSnackbarMessage(router.query.snackbar);
    //   setSeverity("success");
    //   setOpen(true);
    //   router.pathname = router.pathname.split("?")[0];
    // }
    // }, [router.query.snackbar]);

  
    // const handleClose = (event, reason) => {
    //   if (reason === "clickaway") {
    //     return;
    //   }
  
    //   setOpen(false);
    // };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;

  // if (!auth) {
  //   console.log("no auth");
  //   router.push("/login");
  // }
  
  
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
              <Breadcrumbs path={path}/>
              </div>

              <div className="sm:px-4 md:px-">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}


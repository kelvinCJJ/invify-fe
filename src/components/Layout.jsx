// components/layout.js

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Tooltip } from "@mui/material";
import { SettingsApplications } from "@mui/icons-material";
import { useEffect } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { decode, verify } from "jsonwebtoken";
import process from "process";
const jwt = require("jsonwebtoken");

export default function Layout({ children }) {
  const router = useRouter();
  //const {auth, setAuth } = useState(false);
  //const { session, status } = useSession();
  const { auth, setAuth } = useState(false);

  useEffect(() => {
    async () => {
      try {
        if (!auth) {
          console.log("no auth");
          router.push("/login");
        }
        //console.log('layout useEffect');
        //const currentToken = localStorage.getItem("token");
        //console.log(currentToken);
        const tokenJson = jwt.verify(
          res.data.value.token,
          process.env.JWT_SECRET
        );
        //const tokenJson = jwt.decode(res.data.value.token);
        //console.log(tokenJson);
        const isTokenExpired =
          Date.now() >= JSON.parse(tokenJson.split(".")[1]).exp * 1000;
        console.log("tokenexpired: " + isTokenExpired);
        if (!currentToken || isTokenExpired(currentToken)) {
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
        setAuth(false);
      }
    };
  });
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;

  // if (!auth) {
  //   console.log("no auth");
  //   router.push("/login");
  // }

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
            <div className="items-center w-48 lg:w-56 border-r-[1px]  bg-darkshade-500 ">
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
                ? " bg-darkshade-500  min-h-screen w-full"
                : " bg-darkshade-500  min-h-screen w-full"
            }
          >
            <div className="static w-full">
              <Navbar />
            </div>
            <main className="m-5 px-4">{children}</main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

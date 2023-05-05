import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import { Height } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QrScanner from 'qr-scanner'; 
const Stocktake = () => {
  const [result, setResult] = useState("No result");
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  useEffect ( () => {
    async function StockTake() {
    if (data) {
      await axios
      .post(process.env.APIURL + "/stocktakes", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setData("");
      })
    }
  }
  }, [data]);

  return (
    <Layout>
      <div className="p-1">
      {/* <div> */}
          <QrScanner
          scanDelay="100" 
          facingMode="environment"
          //containerStyle={{ "padding-top":"0px" }}
           videoContainerStyle={{ width: "100%", }}
           videoStyle={{ position:"absolute", top: "0px", left: "0px", width: "100%", height: "100%", objectFit: "cover", }}
        onResult={(result) => {
          if (result) {
            //console.log(result);
            setData(result?.text);
          }
        }}
      />
      <Button onClick={() => console.log("scan")}>Start Scan</Button>
      </div>
      </Layout>
  );
};

export default Stocktake;

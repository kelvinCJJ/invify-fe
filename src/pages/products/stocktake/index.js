import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import { Add, Delete, Height, Remove } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import QrReader from "react-scan-qr";
//import { QrScanner } from "@yudiel/react-qr-scanner";

const Stocktake = () => {
  const [startScan, setStartScan] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(null);
  const [loadingScan, setLoadingScan] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [data, setData] = useState("");
  const { openSnackbar } = useStateContext();
  const [scannedInventory, setScannedInventory] = useState([]);

  const handleScan = async (qrCode) => {
    //console.log(qrCode);
    if (qrCode === null || startScan) {
      setLastScanTime(null);
      return;
    }

    if (qrCode === lastScanTime) {
      console.log("same");
      return;
    }

    setStartScan(true);
    setLastScanTime(qrCode);
    setStartScan(false);
    // Check if the product SKU of scanned QR code exists in the database
    const res = await axios.get(
      process.env.APIURL + "/products/sku/" + qrCode,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 200 && res.data.id && res.data.name) {
      // Check if the scanned item already exists in the list
      const existingItem = scannedInventory.find(
        (item) => item.qrCode === qrCode
      );

      if (existingItem) {
        console.log(existingItem);
        // Item already exists, you can handle it accordingly (e.g., show a notification)
        setScannedInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.qrCode === qrCode
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        openSnackbar(
          "Product [ " + existingItem.name + " ] is scanned successfully",
          "success"
        );
        return;
      }

      // Add the scanned item to the list with an initial quantity of 1
      const newItem = {
        qrCode: qrCode,
        id: res.data.id,
        name: res.data.name, // Replace with the actual name of the item
        quantity: 1,
      };
      setScannedInventory((prevInventory) => [...prevInventory, newItem]);
      openSnackbar(
        "Product [ " + newItem.name + " ] is scanned successfully",
        "success"
      );
    } else {
      openSnackbar("Product not found", "error");
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleIncreaseQuantity = (qrCode) => {
    setScannedInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.qrCode === qrCode ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (qrCode) => {
    setScannedInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.qrCode === qrCode && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDeleteItem = (qrCode) => {
    setScannedInventory((prevInventory) =>
      prevInventory.filter((item) => item.qrCode !== qrCode)
    );
  };

  const handleSubmit = async () => {
    // Submit the scanned inventory to the backend
    const stock = scannedInventory.map((item) => ({
      ProductId: item.id,
      StockTakeQuantity: item.quantity,
    }));
    console.log(stock);
    await axios
      .put(process.env.APIURL + "/products/stocktake", stock, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        openSnackbar("Stocktake submitted successfully", "success");
        setScannedInventory([]);
      });
  };

  useEffect(() => {
    console.log(scannedInventory);
  }, [scannedInventory]);

  return (
    <Layout>
      <h2>Inventory Scanning</h2>
      <div className="grid grid-cols-1 gap-2 mt-2 xl:grid-cols-3 xl:gap-4 lg:mt-4 align-center ">
        <div className="bg-gray-200 p-2 m-2 resize">
          <QrReader
            delay={500}
            onError={handleError}
            onScan={handleScan}
            //style={{ width: "80%" }}
            className=" w-full max-w-2xl"
          />
        </div>
        <div className="align-center bg-darkaccent-800 p-4 rounded-2xl xl:col-start-2">
          <p className="text-2xl">Scanned Inventory List</p>
          {scannedInventory.length === 0 ? (
            <p>No items scanned yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 font-semibold text-lg mb-2">
                <div>Product</div>
                <div className="col-start-2 text-center">Quantity</div>
              </div>
              {scannedInventory.map((item) => (
                <div
                  className="grid grid-cols-2 space-y-3 items-center"
                  key={item.qrCode}
                >
                  <div className="text-base text-ellipsis">{item.name}</div>
                  <div className="flex flex-row items-center justify-center">
                    <Add
                      className="fill-darkshade-100 mr-2 cursor-pointer"
                      onClick={() => handleIncreaseQuantity(item.qrCode)}
                    />
                    <div>{item.quantity}</div>

                    <Remove
                      className="fill-darkshade-100 ml-2 cursor-pointer"
                      onClick={() => handleDecreaseQuantity(item.qrCode)}
                    />
                    <Delete
                      className="fill-darkshade-100 ml-5 cursor-pointer"
                      onClick={() => handleDeleteItem(item.qrCode)}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-2">
                <button
                  className="w-full h-10 bg-success-500 text-darkshade-100 rounded-lg"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Stocktake;

import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import { Height } from "@mui/icons-material";
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
    const res = await axios.get(process.env.APIURL + "/products/sku/" + qrCode, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  
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
      openSnackbar("Product [ "+itemName+" ] is scanned successfully", "success");
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
    const productStockTakeDto = scannedInventory.map((item) => ({
      ProductId: item.id,
      StocktakeQuantity: item.quantity,
    }));

    await axios
    .put(process.env.APIURL + "/products/stocktake", productStockTakeDto, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    });

  };

  useEffect(() => {
    console.log(scannedInventory);
  }, [scannedInventory]);

  return (
    <Layout>
      <h2>Inventory Scanning</h2>
      <div className="p-1">
        <QrReader
          delay={500}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <h3>Scanned Inventory</h3>
        {scannedInventory.length === 0 ? (
          <p>No items scanned yet.</p>
        ) : (
          <ul>
            {scannedInventory.map((item) => (
              <li key={item.qrCode}>
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <Button onClick={() => handleIncreaseQuantity(item.qrCode)}>
                  Increase Quantity
                </Button>
                <Button onClick={() => handleDecreaseQuantity(item.qrCode)}>
                  Decrease Quantity
                </Button>
                <Button onClick={() => handleDeleteItem(item.qrCode)}>
                  Delete
                </Button>
              </li>
            ))}
            <Button onClick={() => handleSubmit()}>
                  Submit
              </Button>
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Stocktake;

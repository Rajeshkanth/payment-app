import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Alert from "./components/Alert";
import Paid from "./components/Paid";
import Failed from "./components/Failed";
const socket = io.connect("https://polling-server.onrender.com/socket");

// const socket = io.connect("http://localhost:3009");

export const paymentStore = createContext();

function App() {
  const [alertValue, setAlertValue] = useState([]);
  const [val, setVal] = useState(120);
  const [accNum, setAccNum] = useState("");
  const [accHolder, setAccHolder] = useState("");
  const [amount, setAmount] = useState("");
  const [uniqueId, setUniqueId] = useState(0);
  const [socketRoom, setSocketRoom] = useState("");

  useEffect(() => {
    socket.on("paymentConfirmAlert", (data) => {
      setAlertValue((prev) => [...prev, data.receivedValue]);
      setUniqueId(data.UniqueId);
      setSocketRoom(data.socketRoom);
      setAccNum(data.receivedValue.AccNum);
      setAccHolder(data.receivedValue.AccHolder);
      setAmount(data.receivedValue.Amount);
      sessionStorage.setItem("tabId", data.tabId);
    });
  }, [socket]);

  console.log(alertValue, uniqueId);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:8080/toAlertpage");

        if (response.status === 200) {
          console.log("received");
          const { data } = response.data;
          setAlertValue((prev) => [...prev, data]);
          setAccNum(data.AccNum);
          setAccHolder(data.AccHolder);
          setAmount(data.Amount);
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [alertValue]);
  return (
    <paymentStore.Provider
      value={{
        accNum,
        accHolder,
        amount,
        socket,
        alertValue,
        setAlertValue,
        setAccNum,
        setAccHolder,
        setAmount,
        uniqueId,
        socketRoom,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Alert />}></Route>
          <Route path="/paid" element={<Paid />}></Route>
          <Route path="/failed" element={<Failed />}></Route>
        </Routes>
      </Router>
    </paymentStore.Provider>
  );
}

export default App;

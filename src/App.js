import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Paid from "./components/Paid";
import Failed from "./components/Failed";
const socket = io.connect("https://payment-server-461p.onrender.com", {
  // query: {
  //   source: Math.random() * 100,
  //   from: "confirm page",
  // },
});

// const socket = io.connect("http://localhost:3004");

export const paymentStore = createContext();

function App() {
  const [alertValue, setAlertValue] = useState([]);
  const [val, setVal] = useState(120);
  const [accNum, setAccNum] = useState("");
  const [accHolder, setAccHolder] = useState("");
  const [amount, setAmount] = useState("");
  const [uniqueId, setUniqueId] = useState(0);

  // useEffect(() => {
  //   socket.on("paymentConfirmAlert", (data) => {
  //     setAlertValue((prev) => [...prev, data.receivedValue]);
  //     setUniqueId(data.UniqueId);
  //     setAccNum(data.receivedValue.AccNum);
  //     setAccHolder(data.receivedValue.AccHolder);
  //     setAmount(data.receivedValue.Amount);
  //   });
  // }, [socket]);

  // ... (existing code remains the same)

  useEffect(() => {
    socket.on("paymentConfirmAlert", (data) => {
      setAlertValue((prev) => [...prev, data.receivedValue]);
      setUniqueId(data.UniqueId); // Use UniqueId
      setAccNum(data.receivedValue.AccNum);
      setAccHolder(data.receivedValue.AccHolder);
      setAmount(data.receivedValue.Amount);
      sessionStorage.setItem("tabId", data.tabId); // Store tabId in sessionStorage
    });
  }, [socket]);

  // ... (rest of the existing code)

  console.log(alertValue, uniqueId);
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

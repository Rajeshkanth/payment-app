import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Paid from "./components/Paid";
const socket = io.connect("https://payment-server-461p.onrender.com");
// const socket = io.connect("http://localhost:3004");

const store = createContext();

function App() {
  const [alertValue, setAlertValue] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [val, setVal] = useState(120);
  const [accNum, setAccNum] = useState("");
  const [accHolder, setAccHolder] = useState("");
  const [amount, setAmount] = useState("");

  const confirm = (e) => {
    e.preventDefault();
    if (alertValue.length > 0) {
      console.log("done");
      socket.emit("clicked", { clicked: true });
    }
    setAccNum("");
    setAccHolder("");
    setAmount("");
  };

  const cancel = () => {
    socket.emit("canceled", { cancel: true });
    setAccNum("");
    setAccHolder("");
    setAmount("");
  };

  useEffect(() => {
    socket.on("paymentConfirmAlert", (data) => {
      setAlertValue((prev) => [...prev, data.receivedValu]);
      setAccNum(data.receivedValu.AccNum);
      setAccHolder(data.receivedValu.AccHolder);
      setAmount(data.receivedValu.Amount);
    });

    console.log(alertValue);
  }, [accNum, accHolder, amount]);

  return (
    <store.Provider value={{ accNum, accHolder, amount, confirm, cancel }}>
      <Router>
        <Routes>
          <Route path="/" element={<Alert />}></Route>
          <Route path="/paid" element={<Paid />}></Route>
        </Routes>
      </Router>
    </store.Provider>
  );
}

export default App;

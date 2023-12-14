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
const socket = io.connect("https://payment-server-461p.onrender.com");
// const socket = io.connect("http://localhost:3004");

export const paymentStore = createContext();

function App() {
  const [alertValue, setAlertValue] = useState([]);
  const [val, setVal] = useState(120);
  const [accNum, setAccNum] = useState("");
  const [accHolder, setAccHolder] = useState("");
  const [amount, setAmount] = useState("");

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
    <paymentStore.Provider
      value={{
        accNum,
        accHolder,
        amount,
        socket,
        alertValue,
        setAccNum,
        setAccHolder,
        setAmount,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Alert />}></Route>
          <Route path="/paid" element={<Paid />}></Route>
        </Routes>
      </Router>
    </paymentStore.Provider>
  );
}

export default App;

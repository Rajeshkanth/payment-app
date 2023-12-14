import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
const socket = io.connect("https://payment-server-461p.onrender.com");
// const socket = io.connect("http://localhost:3004");

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
    if (alertValue.length > 0) {
      return setIsCancel(!isCancel);
    }
    setIsCancel(false);
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

  useEffect(() => {
    console.log("clicked");

    socket.on("success", (data) => {
      if (data.success) {
        console.log("done");
      }
    });
  }, [isConfirm]);

  return (
    <>
      <div className="form-container">
        <form className="form">
          <div className="inp-container">
            <input
              id="accNum"
              type="text"
              value={`Account Number : ${accNum}`}
              readOnly
            />

            <input
              id="amount"
              type="text"
              value={`Amount : ${amount}`}
              readOnly
            />
          </div>
          <div>
            <input
              id="accHolder"
              type="text"
              value={`Holder Name : ${accHolder}`}
              readOnly
            />
          </div>
          <div className="btns">
            <input
              type="button"
              value="Confirm"
              id="confirm"
              onClick={confirm}
            />
            <input type="button" value="Cancel" id="cancel" onClick={cancel} />
          </div>
        </form>
      </div>
    </>
  );
}

export default App;

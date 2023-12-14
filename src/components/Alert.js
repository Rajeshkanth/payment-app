import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { paymentStore } from "../App";

function Alert() {
  const {
    accHolder,
    accNum,
    amount,
    socket,
    alertValue,
    setAccNum,
    setAccHolder,
    setAmount,
  } = useContext(paymentStore);
  const navigate = useNavigate();

  const confirm = (e) => {
    e.preventDefault();
    if (alertValue.length > 0) {
      console.log("done");
      socket.emit("clicked", { clicked: true });
      navigate("/paid");
      setTimeout(() => {
        navigate("/");
      }, 3000);
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
    navigate("/failed");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

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
export default memo(Alert);

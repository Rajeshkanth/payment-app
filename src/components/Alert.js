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
    setAlertValue,
    setAccNum,
    setAccHolder,
    setAmount,
  } = useContext(paymentStore);
  const navigate = useNavigate();

  const confirm = (e, index) => {
    e.preventDefault();
    if (alertValue.length > 0) {
      console.log("done");
      socket.emit("clicked", { clicked: true });
      navigate("/paid");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    handleReset(index);
  };

  const cancel = (index) => {
    socket.emit("canceled", { cancel: true });
    handleReset(index);
    navigate("/failed");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleReset = (index) => {
    setAccNum("");
    setAccHolder("");
    setAmount("");

    // Remove the specific alert value from the list after action (confirm/cancel)
    const updatedAlerts = [...alertValue];
    updatedAlerts.splice(index, 1);
    setAlertValue(updatedAlerts);
  };

  return (
    <>
      <div className="form-container">
        {alertValue.map((alert, index) => (
          <form key={index} className="form">
            <div className="inp-container">
              <input
                id={`accNum-${index}`}
                type="text"
                value={`Account Number : ${alert.AccNum}`}
                readOnly
              />
              <input
                id={`amount-${index}`}
                type="text"
                value={`Amount : ${alert.Amount}`}
                readOnly
              />
            </div>
            <div>
              <input
                id={`accHolder-${index}`}
                type="text"
                value={`Holder Name : ${alert.AccHolder}`}
                readOnly
              />
            </div>
            <div className="btns">
              <input
                type="button"
                value="Confirm"
                onClick={(e) => confirm(e, index)}
              />
              <input
                type="button"
                value="Cancel"
                onClick={() => cancel(index)}
              />
            </div>
          </form>
        ))}
      </div>
    </>
  );
}
export default memo(Alert);

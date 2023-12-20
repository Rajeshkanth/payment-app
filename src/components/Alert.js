import React, { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentStore } from "../App";

function Alert() {
  const {
    socket,
    alertValue,
    setAlertValue,
    setAccNum,
    setAccHolder,
    setAmount,
    uniqueId,
    socketRoom,
  } = useContext(paymentStore);

  const navigate = useNavigate();
  console.log(uniqueId);

  const confirm = (e, index, tabId) => {
    e.preventDefault();
    if (alertValue.length > 0) {
      socket.emit("clicked", {
        clicked: true,
        tabId: tabId,
        SocketRoom: socketRoom,
      });
      navigate("/paid");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    handleReset(index);
  };

  const cancel = (e, index, tabId) => {
    e.preventDefault();
    socket.emit("canceled", {
      cancel: true,
      tabId: tabId,
      SocketRoom: socketRoom,
    });
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
      <div className="header">
        <h1>Payment Notifications</h1>
      </div>
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
              <input
                id={`accHolder-${index}`}
                type="text"
                value={`Holder Name : ${alert.AccHolder}`}
                readOnly
              />
            </div>

            <div className="btns">
              {/* <input
                type="button"
                value="Confirm"
                onClick={(e) => confirm(e, index)}
              /> */}
              <input
                type="button"
                value="Confirm"
                id="confirm"
                onClick={(e) => confirm(e, index, alert.tabId)} // Pass tabId to confirm
              />

              <input
                type="button"
                value="Cancel"
                id="cancel"
                onClick={(e) => cancel(e, index, alert.tabId)}
              />
            </div>
          </form>
        ))}
      </div>
    </>
  );
}
export default memo(Alert);

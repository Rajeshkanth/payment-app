import React, { memo } from "react";

function Alert() {
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

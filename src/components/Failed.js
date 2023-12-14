import React from "react";
import { MdOutlineCancel } from "react-icons/md";

function Failed() {
  return (
    <>
      <div className="loading">
        <div class="wrapper">
          <MdOutlineCancel className="fail-icon" />{" "}
        </div>
        <h3>payment transaction failed!</h3>
        <br />
        <p>redirecting to the home page....</p>
      </div>
    </>
  );
}

export default Failed;

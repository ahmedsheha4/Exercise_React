import React from "react";

function StatusBadge(props) {
  let status = props.status;
  return (
    <div className="center">
      <div className={status ? "badge-valid" : "badge-invalid"}>
        <h1>{status ? "Valid" : "Not Valid"}</h1>
      </div>
    </div>
  );
}

export default StatusBadge;

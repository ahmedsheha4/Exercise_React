import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function StatsCard(props) {
  let valid = props.valid;
  let num = props.num;
  return (
    <div className="statsCard">
      <div className="statsIcon">
        <FontAwesomeIcon
          icon={valid ? faCheckCircle : faTimesCircle}
          color={valid ? "green" : "red"}
        />
      </div>
      <div className="statsInfo">
        <h2>{num}</h2>
        <h3>{valid ? "Valid Phone Numbers" : "Invalid Phone Numbers"}</h3>
      </div>
    </div>
  );
}

export default StatsCard;

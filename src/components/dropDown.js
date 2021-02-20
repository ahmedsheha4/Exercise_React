import React from "react";

function DropDown(props) {
  let selectHandler = props.selectHandler;
  let numberOfPhones = props.numberOfPhones;
  return (
    <div className="select-input">
      <select value={numberOfPhones} onChange={selectHandler} id="mySelect">
        <option value="10">Show 10 entries</option>
        <option value="20">Show 20 entries</option>
        <option value="50">Show 50 entries</option>
      </select>
    </div>
  );
}

export default DropDown;

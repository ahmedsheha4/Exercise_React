import React from "react";
import StatusBadge from "./statusBadge";
function PhonesTable(props) {
  let phones = props.phones;
  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Country Code</th>
            <th>Number</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((phone) => {
            return <PhoneRow key={phone.number} phone={phone} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
function PhoneRow(props) {
  let phone = props.phone;
  return (
    <tr>
      <td>{phone.country}</td>
      <td>{phone.code}</td>
      <td>{phone.number}</td>
      <td>
        <StatusBadge status={phone.isValid} />
      </td>
    </tr>
  );
}
export default PhonesTable;

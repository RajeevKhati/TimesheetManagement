import React from "react";

const EmployeeTable = ({ timesheetList }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {timesheetList?.map(
          ({ type, date, startTime, endTime, desc, status }, index) => (
            <tr key={`${index}-${date}`}>
              <td>{type === "leave" ? "Leave" : "Work Hours"}</td>
              <td>{date}</td>
              <td>{startTime}</td>
              <td>{endTime}</td>
              <td>{desc}</td>
              <td>{status}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;

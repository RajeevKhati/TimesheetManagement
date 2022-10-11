import React from "react";

const ManagerTable = ({ employees }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee Email</th>
          <th colSpan={6}>Employee Timesheet Details</th>
        </tr>
      </thead>
      <tbody>
        {employees?.map((emp) => {
          return (
            <tr key={emp.uid}>
              <td>{emp.employee.displayName}</td>
              <td>{emp.employee.email}</td>
              {emp?.data?.map(
                ({ type, date, startTime, endTime, desc, status }, index) => (
                  <React.Fragment key={`${index}-${date}`}>
                    <td>{type === "leave" ? "Leave" : "Work Hours"}</td>
                    <td>{date}</td>
                    <td>{startTime}</td>
                    <td>{endTime}</td>
                    <td>{desc}</td>
                    <td>{status}</td>
                  </React.Fragment>
                )
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ManagerTable;

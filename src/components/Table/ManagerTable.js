import React from "react";
import { APPROVE, REJECT } from "../../utils/constants";
import { Button, Table } from "react-bootstrap";

const ManagerTable = ({ employees, handleManagerAction }) => {
  const renderTable = ({ data: timesheetList }) => {
    // const timesheetList = data?.filter(employeeTimesheet)

    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheetList?.map((timesheetData, index) => {
            const { type, date, status } = timesheetData;
            return (
              <tr
                key={`${index}-${date}`}
                onClick={() => handleRowClick(timesheetData)}
              >
                <td>{type === "leave" ? "Leave" : "Work Hours"}</td>
                <td>{date}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const renderEmployee = (emp, index) => {
    const { employee } = emp;
    return (
      <>
        <p>
          {employee?.displayName && `Name : ${employee?.displayName}`}{" "}
          {employee?.email && `Email : ${employee?.email}`}
        </p>
        {renderTable(emp)}
      </>
    );
  };
  return employees?.map(renderEmployee);
};

export default ManagerTable;

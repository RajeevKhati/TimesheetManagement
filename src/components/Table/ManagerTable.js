import React from "react";
import { APPROVE, REJECT } from "../../utils/constants";
import Button from "../Button";

const ManagerTable = ({ employees, handleManagerAction }) => {
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
        {employees?.map((emp, index) => {
          return (
            <tr key={`${emp.employee.uid}-${index}`}>
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
                    <td>
                      {status}
                      {status === "inProcess" && (
                        <>
                          <Button
                            text={"Approve"}
                            onClick={() =>
                              handleManagerAction(
                                emp.employee.uid,
                                date,
                                APPROVE
                              )
                            }
                          />
                          <Button
                            text={"Reject"}
                            onClick={() =>
                              handleManagerAction(
                                emp.employee.uid,
                                date,
                                REJECT
                              )
                            }
                          />
                        </>
                      )}
                    </td>
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

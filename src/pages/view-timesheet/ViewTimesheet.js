import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import EmployeeTable from "../../components/Table/EmployeeTable";
import ManagerTable from "../../components/Table/ManagerTable";
import { useDB } from "../../contexts/DBContext";

const ViewTimesheet = () => {
  const { timesheetList, employees, isManager, approveTimesheet } = useDB();

  const handleManagerAction = (empUid, date, status) => {
    approveTimesheet(empUid, date, status);
  };

  const renderManagerContent = () => {
    if (employees) {
      return (
        <ManagerTable
          employees={employees}
          handleManagerAction={handleManagerAction}
        />
      );
    }
    return null;
  };

  const renderEmployeeContent = () => {
    if (timesheetList) {
      return (
        <>
          <Stack direction="horizontal" style={{ marginBottom: 10 }}>
            <p
              className="fs-5"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              View Timesheet
            </p>
            <Link className="ms-auto" to="add">
              <Button variant="primary">Add Timesheet</Button>
            </Link>
          </Stack>
          <EmployeeTable timesheetList={timesheetList} />
        </>
      );
    }
    return null;
  };

  return (
    <div className="container">
      {isManager ? renderManagerContent() : renderEmployeeContent()}
    </div>
  );
};

export default ViewTimesheet;

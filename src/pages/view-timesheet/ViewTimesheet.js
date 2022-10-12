import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import EmployeeTable from "../../components/Table/EmployeeTable";
import ManagerTable from "../../components/Table/ManagerTable";
import { useAuth } from "../../contexts/AuthContext";
import { useDB } from "../../contexts/DBContext";

const ViewTimesheet = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { timesheetList, employees, isManager, approveTimesheet } = useDB();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("logout error => ", error);
    }
  };

  const handleManagerAction = (empUid, date, status) => {
    approveTimesheet(empUid, date, status);
  };

  const getTable = () => {
    if (isManager) {
      return (
        <ManagerTable
          employees={employees}
          handleManagerAction={handleManagerAction}
        />
      );
    } else {
      return <EmployeeTable timesheetList={timesheetList} />;
    }
  };
  return (
    <div>
      {(timesheetList || employees) && getTable()}
      <Button text={"Logout"} onClick={handleLogout} />
      <Link to="add">Add Timesheet</Link>
    </div>
  );
};

export default ViewTimesheet;

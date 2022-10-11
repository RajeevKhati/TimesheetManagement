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
  const { timesheetList, employees, isManager } = useDB();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("logout error => ", error);
    }
  };

  const getTable = () => {
    if (isManager) {
      return <ManagerTable employees={employees} />;
    } else {
      return <EmployeeTable timesheetList={timesheetList} />;
    }
  };
  return (
    <div>
      {getTable()}
      <Button text={"Logout"} onClick={handleLogout} />
      <Link to="add">Add Timesheet</Link>
    </div>
  );
};

export default ViewTimesheet;

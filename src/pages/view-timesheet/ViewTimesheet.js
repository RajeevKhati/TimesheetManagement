import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useAuth } from "../../contexts/AuthContext";

const ViewTimesheet = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("logout error => ", error);
    }
  };
  return (
    <div>
      <Table />
      <Button text={"Logout"} onClick={handleLogout} />
      <Link to="add">Add Timesheet</Link>
    </div>
  );
};

export default ViewTimesheet;

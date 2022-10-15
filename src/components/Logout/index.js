import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
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
    <div style={{ cursor: "pointer" }} onClick={handleLogout}>
      Logout
    </div>
  );
};

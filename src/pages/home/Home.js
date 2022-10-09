import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/timesheet" />;
  else return <Navigate to="/login" />;
};

export default Home;

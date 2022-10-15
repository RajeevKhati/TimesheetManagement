import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import DBProvider from "./contexts/DBContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <DBProvider>
      <App />
    </DBProvider>
  </AuthProvider>
  // {/* </React.StrictMode> */}
);

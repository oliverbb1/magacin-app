import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Provjeri token u localStorage
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token; // true ako postoji token

  // Ako nije logovan, preusmjeri na login stranu
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Ako jeste logovan, prikazi traženu stranicu
  return children;
};

export default PrivateRoute;

import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = Cookies.get("task||userInfo");

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const auth = Cookies.get("task||userInfo");
  return auth ? <Navigate to="/task" /> : <Outlet />;
};

export default PublicRoute;

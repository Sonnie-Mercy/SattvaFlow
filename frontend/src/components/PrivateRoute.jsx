import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/user/userSclice";

const PrivateRoute = () => {
  const currentUser = useSelector(selectUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

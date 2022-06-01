import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <Outlet /> : <Navigate to="/" />;
};

import { useContext } from "react";
import Topmenu from "../Topmenu";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import { PATH_LOGIN } from "../constants";

const ProtectedRoutes = () => {
  const { auth } = useContext(AuthContext);
  return auth?.token ? (
    <>
      <Topmenu />
      <Outlet />
    </>
  ) : (
    <Navigate to={PATH_LOGIN} replace />
  );
};

export default ProtectedRoutes;

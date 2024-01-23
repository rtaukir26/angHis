import { Navigate, Outlet } from "react-router-dom";
import routePaths from "./routePaths";

const PrivateRoutes = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));

  return isAuthenticated ? <Outlet /> : <Navigate to={routePaths.login} />;
};

export default PrivateRoutes;

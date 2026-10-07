import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const isLogged = window.localStorage.getItem("isLogged") === "true";

  return isLogged ? <Navigate to="/" replace /> : <Outlet />;
}

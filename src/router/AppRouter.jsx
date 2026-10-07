import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import PublicRoutes from "./PublicRoutes.jsx";

export default function AppRouter() {
  const isLogged = window.localStorage.getItem("isLogged") === "true";

  return (
    <BrowserRouter>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-8">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<HomePage />} path="/" />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
          </Route>
          <Route
            element={<Navigate replace to={isLogged ? "/" : "/login"} />}
            path="*"
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

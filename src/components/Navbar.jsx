import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api.js";

function readIsLoggedIn() {
  return window.localStorage.getItem("isLogged") === "true";
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(readIsLoggedIn);
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function updateAuthState() {
      setIsLoggedIn(readIsLoggedIn());
    }

    window.addEventListener("auth-change", updateAuthState);
    window.addEventListener("storage", updateAuthState);
    return () => {
      window.removeEventListener("auth-change", updateAuthState);
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  async function handleLogout() {
    setLogoutError("");

    try {
      await apiFetch("auth/logout", { method: "POST" });
      window.localStorage.removeItem("isLogged");
      window.localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-change"));
      navigate("/login", { replace: true });
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : "No se pudo cerrar la sesión.",
      );
    }
  }

  const linkClass = ({ isActive }) =>
    `rounded px-3 py-2 text-sm font-medium ${
      isActive
        ? "bg-blue-800 text-white"
        : "text-blue-50 hover:bg-blue-700"
    }`;

  return (
    <header className="bg-blue-700 text-white">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3"
      >
        <Link className="font-bold" to={isLoggedIn ? "/" : "/login"}>
          Gestión patrimonial
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {isLoggedIn ? (
            <>
              <NavLink className={linkClass} end to="/">
                Inicio
              </NavLink>
              <button
                className="rounded bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                onClick={handleLogout}
                type="button"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink className={linkClass} to="/login">
                Iniciar sesión
              </NavLink>
              <NavLink className={linkClass} to="/register">
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      </nav>
      {logoutError && (
        <p className="mx-auto max-w-5xl px-4 pb-3 text-sm" role="alert">
          {logoutError}
        </p>
      )}
    </header>
  );
}

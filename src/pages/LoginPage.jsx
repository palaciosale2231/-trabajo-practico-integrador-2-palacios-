import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import useForm from "../hooks/useForm.js";
import { apiFetch } from "../services/api.js";

export default function LoginPage() {
  const { values, handleInputChange, handleReset } = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await apiFetch("auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      window.localStorage.setItem("isLogged", "true");
      window.dispatchEvent(new Event("auth-change"));
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo iniciar sesión.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ingresá con los datos de tu cuenta.
        </p>

        <form
          className="mt-6 space-y-4"
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <FormField
            autoComplete="email"
            label="Correo electrónico"
            name="email"
            onChange={handleInputChange}
            type="email"
            value={values.email}
          />
          <FormField
            autoComplete="current-password"
            label="Contraseña"
            name="password"
            onChange={handleInputChange}
            type="password"
            value={values.password}
          />

          {error && <StatusMessage message={error} type="error" />}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="rounded bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Ingresando…" : "Iniciar sesión"}
            </button>
            <button
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
              type="reset"
            >
              Limpiar
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          ¿No tenés cuenta?{" "}
          <Link className="font-medium text-blue-700 hover:underline" to="/register">
            Registrate
          </Link>
        </p>
      </div>
    </section>
  );
}

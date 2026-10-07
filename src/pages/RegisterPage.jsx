import { useState } from "react";
import { Link } from "react-router-dom";
import FormField from "../components/FormField.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import useForm from "../hooks/useForm.js";
import { apiFetch } from "../services/api.js";

export default function RegisterPage() {
  const { values, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await apiFetch("auth/register", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setSuccess("La cuenta se creó correctamente. Ya podés iniciar sesión.");
      handleReset();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo completar el registro.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    handleReset();
    setError("");
    setSuccess("");
  }

  return (
    <section className="mx-auto w-full max-w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Crear una cuenta</h1>
        <p className="mt-2 text-sm text-gray-600">
          Completá tus datos para registrarte.
        </p>

        <form
          className="mt-6 space-y-4"
          onReset={resetForm}
          onSubmit={handleSubmit}
        >
          <FormField
            autoComplete="username"
            label="Nombre de usuario"
            name="username"
            onChange={handleInputChange}
            value={values.username}
          />
          <FormField
            autoComplete="email"
            label="Correo electrónico"
            name="email"
            onChange={handleInputChange}
            type="email"
            value={values.email}
          />
          <FormField
            autoComplete="name"
            label="Nombre completo"
            name="name"
            onChange={handleInputChange}
            value={values.name}
          />
          <FormField
            autoComplete="new-password"
            label="Contraseña"
            name="password"
            onChange={handleInputChange}
            type="password"
            value={values.password}
          />

          {error && <StatusMessage message={error} type="error" />}
          {success && <StatusMessage message={success} type="success" />}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="rounded bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Registrando…" : "Registrarse"}
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
          ¿Ya tenés cuenta?{" "}
          <Link className="font-medium text-blue-700 hover:underline" to="/login">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </section>
  );
}

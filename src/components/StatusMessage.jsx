export default function StatusMessage({ message, type = "info" }) {
  const styles = {
    error: "border-red-300 bg-red-50 text-red-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
    success: "border-green-300 bg-green-50 text-green-800",
  };

  return (
    <p
      aria-live={type === "error" ? "assertive" : "polite"}
      className={`rounded border px-4 py-3 text-sm ${styles[type] || styles.info}`}
      role={type === "error" ? "alert" : "status"}
    >
      {message}
    </p>
  );
}

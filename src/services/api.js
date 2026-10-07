const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000/api")
  .replace(/\/+$/, "");

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}/${path.replace(/^\/+/, "")}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      result && typeof result === "object" && "message" in result
        ? result.message
        : `Error del servidor (${response.status}).`;
    throw new Error(message);
  }

  return result;
}

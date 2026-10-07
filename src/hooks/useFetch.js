import { useEffect, useState } from "react";
import { apiFetch } from "../services/api.js";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return undefined;
    }

    let active = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiFetch(url);
        if (active) {
          setData(result);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No se pudo completar la solicitud.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [url]);

  return { data, isLoading, error };
}

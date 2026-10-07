import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(() => ({ ...initialValues }));

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleReset() {
    setValues({ ...initialValues });
  }

  return { values, handleInputChange, handleReset };
}

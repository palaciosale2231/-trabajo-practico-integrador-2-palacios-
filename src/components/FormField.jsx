export default function FormField({
  autoComplete,
  label,
  name,
  onChange,
  required = true,
  type = "text",
  value,
}) {
  const id = `field-${name}`;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        id={id}
        name={name}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
    </div>
  );
}

export default function Input({ children, name, type, placeholder, ...props }) {
  return (
    <div className="flex flex-col gap-2 mb-5 w-full">
      <label className="font-medium text-xl dark:text-white">{children}</label>
      <input
        type={type}
        name={name}
        className={`border-2 border-gray-300 rounded-lg p-2 w-full `}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default function Input({
  value,
  name,
  handleChange,
  placeholder,
  type,
}) {
  return (
    <input
      className=" w-full border border-transparent focus:border-blue-400 focus:border focus:outline-none bg-[#f5f5f5] rounded-xl px-4 py-[6px]"
      type={type}
      value={value}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

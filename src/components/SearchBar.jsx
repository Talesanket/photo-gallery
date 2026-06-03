export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Search by author..."
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg mb-6"
    />
  );
}
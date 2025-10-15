export default function TableHeader({ children }) {
  return (
    <ul className="flex px-5 py-3 dark:bg-[#101011] bg-[#F6F6F6] rounded-t-2xl gap-5">
      {children}
    </ul>
  );
}

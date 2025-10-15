import { Link, useSearchParams } from "react-router-dom";
export default function ProductNavItem({ children, search, count }) {
  const [searchParams] = useSearchParams();
  return (
    <Link
      to={`/products?search=${search}&page=1`}
      className={`w-full  text-center rounded-2xl py-1 flex justify-center gap-1 max-sm:flex-col ${
        searchParams.get("search") === search
          ? "text-[#1A71F6] bg-[#D9EDFF]"
          : ""
      }`}
    >
      <span>{children}</span>
      {count && <span className="text-[#B0B0B0] ">({count})</span>}
    </Link>
  );
}

import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import arrow from "../assets/icons/arrow-up-simple.svg";
import frame from "../assets/Frame.svg";
export default function NavItem({ icon, children, path }) {
  const location = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const activePath = location.includes("products");

  return (
    <>
      <li className="cursor-pointer   ">
        <NavLink
          to={path}
          className={({ isActive }) => {
            return isActive
              ? "bg-[#D9EDFF] w-full py-2 px-3 rounded-xl flex items-center gap-2 "
              : " py-2 px-3 rounded-xl flex items-center gap-2 hover:bg-[#D9EDFF]  ";
          }}
        >
          <img
            src={icon}
            alt=""
            className="inline-block mr-2 dark:brightness-75 dark:invert dark:saturate-100 transition-all duration-300"
          />

          <div className="w-full flex justify-between items-center">
            <span>{children}</span>
            <img
              src={arrow}
              className={`w-[24px] transition-all duration-300  ${
                activePath && "rotate-180"
              }`}
              alt=""
            />
          </div>
        </NavLink>
        <div
          className={`overflow-hidden block relative top-[-12px] h-full transition-all duration-300 ${
            !activePath && "!h-[0]"
          }`}
        >
          <ul
            className={`ml-5 relative flex flex-col gap-5 mt-5 transition-all duration-300 ease-in-out ${
              !activePath
                ? "-translate-y-[170px] duration-300"
                : "-translate-y-[0]"
            }`}
          >
            <img
              src={frame}
              alt=""
              className="w-4 h-[200px] absolute top-[-17px]"
            />
            <NavLink
              to="products?search=sneakers&page=1"
              className={({ isActive }) =>
                searchParams.get("search") === "sneakers"
                  ? "text-[#1A71F6]"
                  : ""
              }
            >
              <li className="pl-5">Sneakers</li>
            </NavLink>
            <NavLink
              to="products?search=jacket&page=1"
              className={({ isActive }) =>
                searchParams.get("search") === "jacket" ? "text-[#1A71F6]" : ""
              }
            >
              <li className="pl-5">Jacket</li>
            </NavLink>
            <NavLink
              to="products?search=tshirt&page=1"
              className={({ isActive }) =>
                searchParams.get("search") === "tshirt" ? "text-[#1A71F6]" : ""
              }
            >
              <li className="pl-5">T-Shirt</li>
            </NavLink>
            <NavLink
              to="products?search=bag&page=1"
              className={({ isActive }) =>
                searchParams.get("search") === "bag" ? "text-[#1A71F6]" : ""
              }
            >
              <li className="pl-5">Bag</li>
            </NavLink>
          </ul>
        </div>
      </li>
    </>
  );
}

import { NavLink } from "react-router-dom";

export default function NavItem({ icon, children, path }) {
  return (
    <>
      <li className="cursor-pointer hover:bg-[#D9EDFF] rounded-xl  ">
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive
              ? "bg-[#D9EDFF] w-full py-2 px-3 rounded-xl flex items-center gap-2 "
              : " py-2 px-3 rounded-xl flex items-center gap-2 "
          }
        >
          <img
            src={icon}
            alt=""
            className="inline-block mr-2 dark:brightness-75 dark:invert dark:saturate-100 transition-all duration-300"
          />
          <span>{children}</span>
        </NavLink>
      </li>
    </>
  );
}

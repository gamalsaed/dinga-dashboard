import SpecialCheckBox from "./SpecialCheckBox";
import Moon from "../assets/icons/moon.svg";

export default function DarkMode() {
  return (
    <li className="py-2 px-3 rounded-xl flex items-center justify-between ">
      <div className="flex items-center gap-1">
        <img
          src={Moon}
          alt=""
          className="inline-block mr-2 dark:brightness-75 dark:invert dark:saturate-100 transition-all duration-300"
        />
        <span>Dark Mode</span>
      </div>
      <SpecialCheckBox />
    </li>
  );
}

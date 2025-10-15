import { useEffect, useState, useContext } from "react";
import { Theme } from "../Contexts/ThemeContext";
export default function SpecialCheckBox() {
  const { dark, setDark } = useContext(Theme);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const state = localStorage.getItem("Mode");
    if (state) {
      setDarkMode(state === "dark" ? true : false);
      setDark(state === "dark" ? true : false);
      if (state === "dark") {
        document.body.classList.add("dark");
      }
    } else {
      localStorage.setItem("Mode", "light");
    }
  }, []);
  const handleDarkMode = (e) => {
    setDarkMode(e.target.checked);
    setDark(e.target.checked);
    localStorage.setItem("Mode", e.target.checked ? "dark" : "light");
    if (e.target.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };
  return (
    <div className="w-[40px] h-[24px] bg-[#D0D5DD] rounded-full relative dark:bg-[#3D3D3D]">
      <input
        type="checkbox"
        id="special-checkbox"
        className="hidden"
        onChange={handleDarkMode}
        checked={darkMode}
      />
      <label
        htmlFor="special-checkbox"
        className="cursor-pointer w-[50%] h-[20px] left-[1.5px] top-[1.75px] bg-white absolute rounded-full dark:translate-x-[15px] dark:!bg-[#1A71F6] transition-transform duration-300"
      ></label>
    </div>
  );
}

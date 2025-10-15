import { useContext, useEffect } from "react";
import { SideBarContext } from "../Contexts/SideContext.jsx";
import { useLocation } from "react-router-dom";
import SideBarHeader from "./SideBarHeader.jsx";
import DarkMode from "../UI/DarkMode.jsx";
import NavItem from "../UI/NavItem";
import NavItemArrow from "../UI/NavItemArrow.jsx";

import Home from "../assets/icons/Home.svg";
import Note from "../assets/icons/note-01.svg";
import userGroup from "../assets/icons/user-group.svg";
import lineChart from "../assets/icons/line-chart.svg";
import Settings from "../assets/icons/settings.svg";
import Help from "../assets/icons/help.svg";

export default function SideBar() {
  const { sideState, close } = useContext(SideBarContext);
  const location = useLocation().pathname;
  useEffect(() => {
    close();
  }, [location]);
  return (
    <div
      className={` max-lg:left-[-60%] overflow-auto max-md:left-[-100%] py-[32px] px-[16px] lg:relative max-lg:fixed  lg:w-full w-[100%] z-[130]  max-lg:!h-[100%] max-lg:bg-white max-lg:dark:bg-[#252525] max-lg:w-[60%] max-md:w-[100%] transition-all duration-300 ease-in-out max-lg:overflow-y-auto ${
        sideState
          ? " max-lg:!left-0 max-md:!left-0 "
          : " max-lg:!left-[-60%] max-md:!left-[-100%] "
      }`}
    >
      <SideBarHeader />
      <h1 className="text-lg text-[#727272] mt-16 px-3 font-medium">GENERAL</h1>
      <ul className="text-[#888888] px-3 text-[18px] mt-5 flex flex-col gap-3">
        <NavItem icon={Home} path="/">
          Dashboard
        </NavItem>
        <NavItemArrow icon={Home} path="products?page=1" dropdown={true}>
          Product
        </NavItemArrow>
        <NavItem icon={Note} path="transactions">
          Transactions
        </NavItem>
        <NavItem icon={userGroup} path="customers">
          Customers
        </NavItem>
        <NavItem icon={lineChart} path="sales-report">
          Sales Report
        </NavItem>
        <h1 className="text-lg text-[#727272] mt-16 px-3 font-medium">TOOLS</h1>
        <NavItem icon={Settings} path="account-settings">
          Account & Settings
        </NavItem>
        <NavItem icon={Help} path="help">
          Help
        </NavItem>
        <DarkMode />
      </ul>
    </div>
  );
}

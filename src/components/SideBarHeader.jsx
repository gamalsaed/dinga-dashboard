import { useContext } from "react";
import { SideBarContext } from "../Contexts/SideContext.jsx";
import logo from "../assets/logo.png";
import company from "../assets/company.png";
import { AiOutlineClose } from "react-icons/ai";
export default function SideBarHeader() {
  const { close } = useContext(SideBarContext);
  return (
    <>
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center px-3">
          <img src={logo} alt="Logo" className="w-[35px] text-white" />
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Dinga Dashboard
          </h1>
        </div>
        <AiOutlineClose
          className="text-3xl cursor-pointer lg:hidden dark:text-[#949494] "
          onClick={close}
        />
      </div>
      <div className="mt-16 flex gap-3 items-center border border-[#E7E7E7] rounded-md py-1 px-3">
        <img src={company} className="w-[40px] h-[40px]" alt="" />
        <div>
          <p className="text-[#737373] dark:text-[#D1D1D1]">Company</p>
          <p className="text-[17px] text-black dark:text-white">Kanky Store</p>
        </div>
      </div>
    </>
  );
}

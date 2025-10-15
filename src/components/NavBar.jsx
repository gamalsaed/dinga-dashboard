import { useContext, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { SideBarContext } from "../Contexts/SideContext.jsx";

import { CiSearch } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";

import profilePhoto from "../assets/profile.jpg";
export default function NavBar() {
  const { open } = useContext(SideBarContext);

  const [searchText, setSearchText] = useState("");
  function submitHandler(e) {
    const formData = new FormData(e.target);
    const searchText = formData.get("search");
    setSearchText(searchText);
  }
  return (
    <>
      <nav className="max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:bg-white max-md:dark:bg-[#252525] max-md:shadow-lg max-md:z-50">
        <ul className="flex justify-between items-center p-5 max-md:flex-col-reverse z-10">
          <li
            className={`w-[350px] max-md:mt-5 relative h-fit  max-md:w-[80%] max-md:max-md:z-10  max-md:bg-white max-md:dark:bg-[#252525]`}
          >
            <Form
              action={`/products?search=${searchText}&page=1`}
              onSubmit={submitHandler}
            >
              <input
                type="text"
                name="search"
                placeholder="Search Product"
                className="focus:outline-none border-1 max-md:max-md:z-4 border-[#B0B0B0] dark:border-[#D1D1D1] rounded-lg px-[16px] py-[8px] w-full text-[#949494] "
              />
              <CiSearch className="text-[#949494] text-2xl absolute top-2 right-3" />
            </Form>
          </li>
          <li className="flex items-center gap-5 max-md:w-[100%] max-md:justify-between max-md:bg-white max-md:dark:bg-[#252525] max-md:z-100">
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[36px]">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-start  flex-col dark:text-white">
                <span className="text-md">Gamal Saed</span>
                <span className="text-sm">Admin</span>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <LuMenu
                className="text-[#949494] text-4xl lg:hidden block cursor-pointer"
                onClick={open}
              />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

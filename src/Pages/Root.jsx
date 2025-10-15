import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "../UI/Loading.jsx";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import SideBarProvider from "../Contexts/SideContext.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useLocation } from "react-router-dom";
import { formatTitle } from "../utilities.js";
export default function Root() {
  const location = useLocation();
  const path = formatTitle(location.pathname);
  const fallback = (
    <div className="flex justify-center items-center h-screen ">
      <Loading />
    </div>
  );

  return (
    <SideBarProvider>
      <Toaster position="top-center" />
      <ScrollToTop />
      <div className="w-full h-full ">
        <div className="grid grid-cols-[400px_1fr] w-full h-full ">
          <SideBar />
          <div className="w-[100%] h-full max-lg:col-span-2">
            <NavBar />
            <div className="px-5 pt-5 relative max-md:mt-36 z-0 bg-[#E7E7E7] dark:bg-[#101011] h-[100%]">
              <h1 className="text-2xl text-black dark:text-white">
                {path.title}
              </h1>
              <Suspense fallback={fallback}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </SideBarProvider>
  );
}

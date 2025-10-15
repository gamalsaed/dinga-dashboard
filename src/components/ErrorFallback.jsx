import { Link, useRouteError } from "react-router-dom";
import errorImg from "../assets/error.svg";
export function ErrorFallback() {
  const error = useRouteError();
  let title = "Something went Wrong!";
  //   console.log(error.message);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#1A1A1B] p-6 border-[#E7E7E7] dark:border-[#3D3D3D] dark:text-white">
      <div className="max-w-md text-center space-y-4">
        <img src={errorImg} alt="" />
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm">{error.message}</p>
        <Link className="cursor-pointer" to="/">
          <button className="mt-4 px-4 py-2 bg-white dark:bg-[#000000]   rounded  cursor-pointer">
            Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

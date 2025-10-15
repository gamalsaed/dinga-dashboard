import Map from "./Map.jsx";
import { Link } from "react-router-dom";
import ArrowUp from "../assets/icons/arrow-up-right.svg";
export default function MapBox() {
  return (
    <div
      className="w-full max-xs:w-[100%] h-[400px] p-[20px] bg-white rounded-2xl dark:bg-[#1A1A1B] mt-5 dark:text-white flex flex-col justify-between"
      id="map"
    >
      <div className="text-md font-medium flex items-start justify-between">
        <div className="flex flex-col leading-7 text-xl">
          <span>Customer Growth</span>
          <span className="text-[18px]">3 Province</span>
        </div>
        <div className="text-[15px]">
          <Link to="map" className="flex items-center gap-2">
            <span>Show All</span>
            <img
              src={ArrowUp}
              className={`w-[30px] brightness-75 invert saturate-100`}
            />
          </Link>
        </div>
      </div>
      <div className="w-full h-[300px] max-xs:w-[100%]">
        <Map />
      </div>
    </div>
  );
}

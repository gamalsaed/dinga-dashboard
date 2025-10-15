import { useState } from "react";
import CustomRange from "../UI/CustomRange";
import { formatCurrency } from "../utilities.js";
const target = 50000000;

export default function SalesTarget() {
  const [value, setValue] = useState(50);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="w-full h-fit bg-white dark:bg-[#1A1A1B] rounded-2xl p-5 ">
      <div>
        <div>
          <h1 className="text-[16px] text-[#454545] dark:text-white">
            Sales Target
          </h1>
          <div className="flex justify-between items-center mt-3">
            <div className="flex flex-col gap-2">
              <p className="text-[#454545] dark:text-[#B0B0B0]">In Progress</p>
              <p className="dark:text-white">
                {formatCurrency(target * (value / 100))}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#454545] dark:text-[#B0B0B0]">Sales Target</p>
              <p className="dark:text-white">{formatCurrency(target)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 h-fit rounded-2xl">
        <CustomRange rangeHandler={handleChange} value={value} />
      </div>
    </div>
  );
}

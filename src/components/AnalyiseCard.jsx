import ArrowUp from "../assets/icons/arrow-up-right.svg";
import StaticUp from "../assets/icons/akar-icons_statistic-up.svg";
import StaticDown from "../assets/icons/akar-icons_statistic-down.svg";
import { formatCurrency } from "../utilities";
export default function AnalyiseCard({
  children,
  total,
  percentage,
  state,
  special = false,
}) {
  return (
    <div
      className={`bg-white ${
        special && "!bg-[#1A71F6] text-white"
      } dark:!bg-[#1A1A1B] w-full px-4 py-2 rounded-2xl min-h-[151px] flex flex-col justify-between`}
    >
      <div className="flex justify-between items-center m-2">
        <h1 className={`text-xl font-medium dark:text-white `}>{children}</h1>
        <img
          src={ArrowUp}
          className={`w-[30px] brightness-75 invert saturate-100 ${
            special && "!brightness-0 dark:!brightness-75"
          }`}
          alt=""
        />
      </div>
      <div className="flex justify-between items-end m-2">
        <h1 className="text-2xl">{formatCurrency(total)}0</h1>
        <div className="flex flex-col items-end">
          <div
            className={`flex flex-row items-center gap-2 ${
              state === "up" ? "text-[#04910C]" : "text-[#FF0000]"
            }`}
          >
            <img src={state === "up" ? StaticUp : StaticDown} alt="" />
            {percentage}%<span></span>
          </div>
          <p>From last week</p>
        </div>
      </div>
    </div>
  );
}

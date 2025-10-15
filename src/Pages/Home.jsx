import SalesTarget from "../components/SalesTarget";
import AnalyiseCard from "../components/AnalyiseCard.jsx";
import Ads from "../components/Ads.jsx";
import Chart from "../components/Chart.jsx";
import { useResizeDetector } from "react-resize-detector";
import MapBox from "../components/MapBox.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import accordianDrop from "../assets/icons/accordianDrop.svg";
import accordianDropDark from "../assets/icons/accordianDropDark.svg";
import { useTableAccordian } from "../Contexts/AccordianTableCtx.jsx";
export default function Home() {
  const { ref: sectionRef, height } = useResizeDetector();
  const { toggleItem, openId } = useTableAccordian();
  return (
    <main className="w-full">
      <section
        className="w-full flex justify-center mt-7 gap-5 max-xs:flex-wrap "
        ref={sectionRef}
      >
        <div className="w-[50%] max-xs:w-[100%]">
          <SalesTarget />
          <div
            className={`mt-5 bg-white dark:bg-[#1A1A1B] rounded-2xl h-[362px]`}
            style={{ height: `${height <= 696 ? height - 200 : 362}px` }}
          >
            <Chart />
          </div>
        </div>

        <div className="w-[50%] max-xs:w-[100%] ">
          <div className="dark:text-white flex gap-5 flex-col">
            <div className="w-full flex gap-5 max-sm:flex-col">
              <AnalyiseCard total={81.0} percentage="1.5" state="up" special>
                Total Revenue
              </AnalyiseCard>
              <AnalyiseCard total={81.0} percentage="1.5" state="up">
                Total Customer
              </AnalyiseCard>
            </div>
            <div className="w-full flex gap-5 max-sm:flex-col">
              <AnalyiseCard total={81.0} percentage="1.5" state="up">
                Total Transactions
              </AnalyiseCard>
              <AnalyiseCard total={81.0} percentage="1.5" state="down">
                Total Product
              </AnalyiseCard>
            </div>
            <div className="relative w-full min-h-[220px] overflow-hidden rounded-2xl ">
              <Ads />
            </div>
          </div>
        </div>
      </section>
      <section className="flex gap-5 max-xs:flex-col">
        <MapBox />
        {/* <PopularProducts /> */}
      </section>
    </main>
  );
}

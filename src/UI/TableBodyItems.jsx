import { useTableAccordian } from "../Contexts/AccordianTableCtx";
import { useState, useEffect, useRef } from "react";
export default function TableBodyItems({ children, className, id }) {
  const { openId } = useTableAccordian();
  const [height, setHeight] = useState();
  const accordianRef = useRef(null);
  useEffect(() => {
    setHeight(openId === id ? accordianRef.current.scrollHeight : "60px");
  }, [openId]);
  return (
    <ul
      style={{ height: height }}
      ref={accordianRef}
      className={`flex  px-5 py-3 gap-5 border-t border-[#E7E7E7] dark:border-[#3D3D3D] max-md:flex-col max-md:overflow-hidden transition-all duration-300 ease-in-out  ${className}`}
    >
      {children}
    </ul>
  );
}

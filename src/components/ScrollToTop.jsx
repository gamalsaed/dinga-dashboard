import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTableAccordian } from "../Contexts/AccordianTableCtx";
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { toggleItem } = useTableAccordian();
  useEffect(() => {
    window.scrollTo(0, 0);
    toggleItem("");
  }, [pathname]);

  return null;
}

import { createContext, useState, useContext } from "react";

const TableAccordianCtx = createContext();

export function useTableAccordian() {
  const ctx = useContext(TableAccordianCtx);

  return ctx;
}

export default function AccordianTableProvider({ children }) {
  const [openId, setOpenId] = useState(null);

  function toggleItem(id) {
    if (window.innerWidth < 768) {
      setOpenId(id === openId ? null : id);
    }
  }

  const ctx = {
    openId,
    toggleItem,
  };
  return (
    <TableAccordianCtx.Provider value={ctx}>
      {children}
    </TableAccordianCtx.Provider>
  );
}

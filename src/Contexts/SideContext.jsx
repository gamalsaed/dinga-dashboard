import { createContext, useState } from "react";

export const SideBarContext = createContext(false);

export default function SideBarProvider({ children }) {
  const [state, setState] = useState(false);

  function handleClose() {
    setState(false);
  }
  function handleOpen() {
    setState(true);
  }

  const myCtx = {
    open: handleOpen,
    close: handleClose,
    sideState: state,
  };

  return (
    <SideBarContext.Provider value={myCtx}>{children}</SideBarContext.Provider>
  );
}

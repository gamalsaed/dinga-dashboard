import { useRef } from "react";
import { createPortal } from "react-dom";

export function useModal() {
  const dialogRef = useRef(null);
  const open = () => {
    dialogRef.current.showModal();
    document.body.classList.add("overflow-hidden");
  };
  const close = () => {
    dialogRef.current.close();
    document.body.classList.remove("overflow-hidden");
  };
  function Modal({ children }) {
    const modal = (
      <dialog
        ref={dialogRef}
        className="animate-fade-in p-5 fixed mx-auto w-[700px] top-[10%] bg-white dark:bg-[#1A1A1B]  dark:text-white rounded-2xl"
      >
        <div>{children}</div>
      </dialog>
    );
    return createPortal(modal, document.getElementById("dialog-modal"));
  }

  return { open, close, Modal };
}

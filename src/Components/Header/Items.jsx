import { useState } from "react";
import AbovemdLayout from "./AbovemdItems";
import BelowmdLayout from "./BelowmdItems";
import Overlay from "./Overlay";
import Sidebar from "./Sidebar";

export default function Items() {
  function toogleSideBar() {
    setIsOpen((crntState) => !crntState);
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* big screens */}
      <AbovemdLayout />
      {/* small screens */}
      <BelowmdLayout toogleSideBar={toogleSideBar} />
      {/* OVERLAY */}
      <Overlay isOpen={isOpen} toogleSideBar={toogleSideBar} />
      <Sidebar isOpen={isOpen} toogleSideBar={toogleSideBar} />
    </>
  );
}

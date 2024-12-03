import { useState } from "react";
import AbovemdLayout from "./AbovemdItems";
import BelowmdLayout from "./BelowmdItems";
import Overlay from "./Overlay";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, logout } from "../../Store/Slices/userSlice";
import LogoutHeader from "../LogoutItemsHeader";

export default function Items() {
  const dispath = useDispatch();
  const { status, firstname } = useSelector((state) => state.user); // Select the necessary state
  function toogleSideBar() {
    setIsOpen((crntState) => !crntState);
  }
  function handleLogout() {
    dispath(clearUser());
    dispath(logout());
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* big screens */}
      {status === "success" ? (
        <LogoutHeader
          handleLogout={handleLogout}
          firstname={firstname}
          id={firstname}
        />
      ) : (
        <>
          <AbovemdLayout />
          {/* small screens */}
        </>
      )}

      <BelowmdLayout toogleSideBar={toogleSideBar} />
      {/* OVERLAY */}
      <Overlay isOpen={isOpen} toogleSideBar={toogleSideBar} />
      <Sidebar
        isOpen={isOpen}
        toogleSideBar={toogleSideBar}
        status={status}
        handleLogout={handleLogout}
      />
    </>
  );
}

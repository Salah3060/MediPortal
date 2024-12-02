import { useState } from "react";
import AbovemdLayout from "./AbovemdItems";
import BelowmdLayout from "./BelowmdItems";
import Overlay from "./Overlay";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { clearUser, logout } from "../../Store/Slices/userSlice";

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
        <div className="hidden md:flex gap-x-5 items-center">
          welcome {firstname}
          <IoIosLogOut
            className="text-xl hover:text-tertiary cursor-pointer "
            onClick={handleLogout}
          />
        </div>
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

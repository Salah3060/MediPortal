import { useEffect, useState } from "react";
import AbovemdLayout from "./AbovemdItems";
import BelowmdLayout from "./BelowmdItems";
import Overlay from "./Overlay";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, logout } from "../../Store/Slices/userSlice";
import LogoutHeader from "../LogoutItemsHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function Items({ openUserInfoModal }) {
  const dispath = useDispatch();
  const { status, firstname, userRole, userid } = useSelector(
    (state) => state.user
  ); // Select the necessary state
  const navigate = useNavigate();
  function toogleSideBar() {
    setIsOpen((crntState) => !crntState);
  }
  useEffect(() => {
    if (userRole.toLowerCase() === "doctor") {
      if (!location.pathname.startsWith("/MediPortal/doctor"));
      {
        navigate(`/MediPortal/doctor/${userid}`);
      }
    }
  }, [navigate, userRole, userid]);
  function handleLogout() {
    dispath(clearUser());
    dispath(logout());
    toast.success("Logging out...");
    setTimeout(() => {
      navigate("/");
    }, 1000);
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
          openUserInfoModal={openUserInfoModal}
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

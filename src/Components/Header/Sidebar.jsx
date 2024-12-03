/* eslint-disable react/prop-types */
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function Sidebar({
  isOpen,
  toogleSideBar,
  status,
  handleLogout,
}) {
  return (
    <div
      className={`bg-primary fixed top-0 bottom-0 right-0 w-1/2 sm:w-[350px] 
            transition-all duration-500
            ${isOpen ? "translate-x-0" : "translate-x-96"}
            pt-16 z-40`}
    >
      <button
        className="text-white  focus:outline-none text-[2.5rem] 
            absolute top-2 right-4"
        onClick={toogleSideBar}
      >
        &rarr;
      </button>
      <ul className="flex flex-col gap-y-5 h-full">
        <Link to={"/MediPortal/"} onClick={toogleSideBar}>
          <li className="sliderElement">
            <IoHomeOutline className="text-2xl" /> Home
          </li>
        </Link>
        <Link to={"/MediPortal/signup/"} onClick={toogleSideBar}>
          <li className="sliderElement">
            <FaRegUser className="text-2xl" />
            join now as a user
          </li>
        </Link>
        {status !== "success" ? (
          <Link to={"/MediPortal/login/"} onClick={toogleSideBar}>
            <li className="sliderElement">
              <IoIosLogIn className="text-3xl" onClick={toogleSideBar} />
              Login
            </li>
          </Link>
        ) : (
          <li
            className="sliderElement"
            onClick={() => {
              toogleSideBar();
              handleLogout();
            }}
          >
            <IoIosLogOut className="text-3xl" />
            Logout
          </li>
        )}
        <Link to={"/MediPortal/contact/"} onClick={toogleSideBar}>
          <li className="sliderElement">
            <CiPhone className="text-3xl" />
            contact us
          </li>
        </Link>
      </ul>
    </div>
  );
}

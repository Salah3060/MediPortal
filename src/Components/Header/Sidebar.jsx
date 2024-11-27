import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function Sidebar({ isOpen, toogleSideBar }) {
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
        <Link to={"/MediPortal/"}>
          <li className="w-full flex items-center gap-4 ps-5 py-5  border-b-[1px] border-b-white border-opacity-30 sm:text-lg hover:text-tertiary cursor-pointer hover:bg-gray-700">
            <IoHomeOutline className="text-2xl" /> Home
          </li>
        </Link>
        <Link to={"/MediPortal/signup/"}>
          <li className="w-full flex items-center gap-4 ps-5 py-5  border-b-[1px] border-b-white border-opacity-30 sm:text-lg hover:text-tertiary cursor-pointer hover:bg-gray-700">
            <FaRegUser className="text-2xl" />
            join now as a user
          </li>
        </Link>
        <Link to={"/MediPortal/login/"}>
          <li className="w-full flex items-center gap-4 ps-5 py-5  border-b-[1px] border-b-white border-opacity-30 sm:text-lg hover:text-tertiary cursor-pointer hover:bg-gray-700">
            <IoIosLogIn className="text-3xl" />
            Login
          </li>
        </Link>
        <Link to={"/MediPortal/contact/"}>
          <li className="w-full flex items-center gap-4 ps-5 py-5  border-b-[1px] border-b-white border-opacity-30 sm:text-lg hover:text-tertiary cursor-pointer hover:bg-gray-700">
            <CiPhone className="text-3xl" />
            contact us
          </li>
        </Link>
      </ul>
    </div>
  );
}

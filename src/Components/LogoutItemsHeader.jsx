/* eslint-disable react/prop-types */
import { IoIosLogOut } from "react-icons/io";

export default function LogoutHeader({ handleLogout, firstname, id }) {

  return (
    <div className="hidden md:flex gap-x-5 items-center">
      <div className="flex flex-col justify-center items-center">
        <img
          src={`https://i.pravatar.cc/48?u=${id + 122}`}
          alt="user's photo"
          className="w-10 rounded-full"
        />
        welcome {firstname}
      </div>
      <IoIosLogOut
        className="text-xl hover:text-tertiary cursor-pointer "
        onClick={handleLogout}
      />
    </div>
  );
}

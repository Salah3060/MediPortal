/* eslint-disable react/prop-types */
import Logo from "./Logo";
import Items from "./Items";

const Header = ({ openUserInfoModal }) => {
  return (
    <div className="bg-primary text-white flex justify-center items-center py-1 px-5">
      {/* CONTAINER */}
      <div
        className="
        lg:w-11/12 w-full
        flex justify-between items-center
        xl:h-[4.375rem] lg:h-[3.75rem] h-[3.125rem]"
      >
        <Logo />
        <Items openUserInfoModal={openUserInfoModal} />
        {/* Upload Section */}
      </div>
    </div>
  );
};

export default Header;

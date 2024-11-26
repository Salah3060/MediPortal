import { PiHandbag } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState } from "react";
const PharmacyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-primary text-white relative">
      <div className="container max-w-[1500px] mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <div className="logo">
          <Link to={"/MediPortal/"}>
            <img
              src="/MediPortal/HeaderHorLogo.png"
              alt="Logo"
              className="h-16"
            />
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="buttons hidden md:flex items-center gap-8 font-medium text-[16px]">
          <Link
            to={"/MediPortal/login"}
            className="hover:text-tertiary transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to={"/MediPortal/signup"}
            className="hover:text-tertiary transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            to={"/MediPortal/"}
            className="hover:text-tertiary transition-all duration-300"
          >
            <PiHandbag className="text-2xl" />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] bg-primary shadow-lg transition-transform duration-300 z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start gap-6 p-4 tex-[18px] font-semibold">
          <button
            className="text-white text-2xl self-end focus:outline-none"
            onClick={toggleMenu}
          >
            ✕
          </button>
          <Link
            to={"/MediPortal/login"}
            className="hover:text-tertiary transition-all duration-300 w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to={"/MediPortal/signup"}
            className="hover:text-tertiary transition-all duration-300 w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
          <Link
            to={"/MediPortal/"}
            className="hover:text-tertiary transition-all duration-300 w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            <PiHandbag className="text-2xl" />
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default PharmacyHeader;

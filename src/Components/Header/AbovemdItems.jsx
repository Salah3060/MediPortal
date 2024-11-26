import { Link } from "react-router-dom";

export default function AbovemdLayout() {
  return (
    <ul className="md:flex hidden w-1/3 justify-end gap-8 lg:text-lg text-sm">
      <Link
        to={"/MediPortal/login/"}
        className="hover:text-tertiary hover:border-b transition-all duration-300 "
      >
        Login
      </Link>
      <Link
        to={"/MediPortal/signup/"}
        className="hover:text-tertiary hover:border-b transition-all duration-300 "
      >
        Sign up
      </Link>
      <Link
        to={"/MediPortal/contact/"}
        className="hover:text-tertiary hover:border-b transition-all duration-300 "
      >
        Contact Us
      </Link>
    </ul>
  );
}

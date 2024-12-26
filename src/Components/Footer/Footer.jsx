import { Link } from "react-router-dom";
import Logo from "../Header/Logo";

const Footer = () => {
  return (
    <div className="bg-primary text-slate-200 text-sm py-10 ">
      <div className="container mx-auto  grid lg:grid-cols-4 sm:grid-cols-2 gap-y-10 items-start justify-center ">
        <ul className="flex flex-col justify-center items-center gap-y-2 ">
          <Logo />
          <Link to={"/MediPortal/team/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Our Team
            </li>
          </Link>
        </ul>

        <ul className="flex flex-col justify-center items-center gap-y-2">
          <li className="font-bold text-xl mb-3">Search By</li>
          <Link to={"/MediPortal/team/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Our Team
            </li>
          </Link>
          <Link to={"/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Area{" "}
            </li>
          </Link>
          <Link to={"/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Insurance
            </li>
          </Link>
          <Link to={"/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Hospital
            </li>
          </Link>
          <Link to={"/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Center
            </li>
          </Link>
        </ul>

        <ul className="flex flex-col justify-center items-center gap-y-2">
          <li className="font-bold text-xl mb-3">Are you a doctor ?</li>
          <Link to={"/MediPortal/signup/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Join MediPortal doctors
            </li>
          </Link>
        </ul>

        <ul className="flex flex-col justify-center items-center gap-y-2">
          <li className="font-bold text-xl mb-3">Need help?</li>
          <Link to={"/MediPortal/contact/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Contact us
            </li>
          </Link>

          <Link to={"/MediPortal/pharmacy/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Place an order in our pharmacy
            </li>
          </Link>
          <Link to={"/MediPortal/question/"}>
            <li className="hover:text-tertiary hover:border-b transition-all duration-200">
              Have a medical query
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

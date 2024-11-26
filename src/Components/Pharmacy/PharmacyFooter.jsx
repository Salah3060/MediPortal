import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const PharmacyFooter = () => {
  return (
    <div className="bg-gray-100 py-4">
      <div className="container max-w-[1500px] mx-auto flex flex-wrap justify-between items-center px-4 gap-4">
        {/* Social Icons */}
        <div className="socials flex gap-4 items-center text-xl text-secondary">
          <Link
            to={"https://www.facebook.com/"}
            className="hover:text-tertiary hover:scale-110 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </Link>
          <Link
            to={"https://www.instagram.com/"}
            className="hover:text-tertiary hover:scale-110 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </Link>
          <Link
            to={"https://twitter.com/?lang=en"}
            className="hover:text-tertiary hover:scale-110 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </Link>
        </div>

        {/* Contact Section */}
        <div className="contact flex flex-wrap items-center text-center text-lightGrayText text-sm md:text-base">
          <h1>
            Have questions or need help?{" "}
            <Link
              to={"/MediPortal/contact"}
              className="font-bold text-primary underline underline-offset-2 hover:text-tertiary transition-all duration-300"
            >
              Contact Us
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PharmacyFooter;

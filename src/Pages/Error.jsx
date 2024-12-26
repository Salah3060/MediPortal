import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[645px] gap-8 w-full px-4">
      <div className="buttons flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="text-darkRed text-2xl md:text-3xl font-bold">
          Page Not Found
        </h1>
        <p className="text-darkRed/60 text-base md:text-lg mt-2">
          The page you are looking for does not exist.
        </p>

        <div className="flex gap-4 w-full">
          <Link
            to="/"
            className="text-white bg-darkRed px-6 py-2 rounded-lg text-center mt-8 md:mt-10"
          >
            Back to Home
          </Link>
          <Link
            to="/MediPortal/search"
            className="text-white bg-darkRed px-6 py-2 rounded-lg text-center mt-8 md:mt-10"
          >
            MediPortal Doctors
          </Link>
        </div>
      </div>
      <div className="image w-full max-w-xs md:max-w-md lg:max-w-lg">
        <img
          src="/error.png"
          alt="Payment Error"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Error;

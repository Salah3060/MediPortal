import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import Filters from "./Filters";
import DoctorsSection from "./DoctorsSection";

const Result = () => {
  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-2 flex flex-col">
      {/* Header */}
      <div className="w-full py-2 Header text-[12px]">
        <div className="container max-w-screen-2xl mx-auto">
          <p className="flex gap-2">
            <Link
              className="flex gap-2 items-center text-secondary"
              to={"/MediPortal/"}
            >
              <GoHome className="text-lg" />
              <span>MediPort</span>
            </Link>
            <span>/</span>
            <span className="text-primary capitalize font-semibold">
              All Doctors
            </span>
          </p>
        </div>
      </div>

      {/* Result Page */}
      <div className="py-[12px]">
        <div className="container max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-[24px]">
          {/* Filters */}
          <Filters />
          {/* Products List */}
          <DoctorsSection />
        </div>
      </div>
    </div>
  );
};

export default Result;

import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { useSelector } from "react-redux";
import Loader from "@/Components/Loader";
import { renderStars } from "@/Utils/functions.util";
import { FaInfo } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import ReviewCard from "./Cards/ReviewCard";

const DoctorInfo = () => {
  const { selectedDoctor, loading, error } = useSelector(
    (state) => state.search
  );

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-2 flex flex-col">
      {/* Breadcrumb */}
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
              Doctor {selectedDoctor?.firstname} {selectedDoctor?.lastname}
            </span>
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="section flex flex-col lg:flex-row gap-4 w-full mt-2">
        {/* Doctor Information Section */}
        <div className="docInfo flex flex-col gap-4 w-full lg:w-[60%]">
          {/* Doctor Card */}
          <div className="docCard flex flex-col md:flex-row gap-6 bg-white px-6 py-4 rounded-xl">
            <div className="image flex-shrink-0">
              <img
                src="/MediPortal/doctor.png"
                alt="Doctor Image"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              />
            </div>
            <div className="text flex flex-col gap-1 text-secondary">
              <h2 className="text-lg font-semibold capitalize">
                Doctor {selectedDoctor?.firstname} {selectedDoctor?.lastname}
              </h2>
              <p className="mt-2">{selectedDoctor?.about}</p>
              <p className="text-[14px]">{selectedDoctor?.specialization}</p>
              <p className="text-darkRed/60 mt-2">
                Years of experience:{" "}
                <span className="text-primary font-bold">
                  {selectedDoctor?.yearsofexperience}
                </span>
              </p>
              <div className="rating flex items-center gap-2 mt-2">
                <div className="rating flex justify-center md:justify-start gap-1">
                  {renderStars(4.2)}
                </div>
                <p className="text-[10px] text-primary/60">Overall Rating</p>
                <a
                  href="#reviews"
                  className="text-[10px] text-darkRed underline-offset-2 underline"
                >
                  Show All Reviews
                </a>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="About bg-white w-full px-6 py-4 rounded-xl flex flex-col gap-4">
            <div className="head flex items-center gap-4">
              <FaInfo className="text-lg text-darkRed" />
              <h1 className="text-md font-semibold text-secondary">
                About the doctor
              </h1>
            </div>
            <p className="text-md text-primary">{selectedDoctor?.about}</p>
          </div>

          {/* Reviews Section */}
          <div className="reviews bg-white w-full px-6 py-4 rounded-xl flex flex-col gap-4">
            <div className="head flex items-center gap-4">
              <FaRegStarHalfStroke className="text-lg text-darkRed" />
              <h1 className="text-md font-semibold text-secondary">
                Patients Reviews
              </h1>
            </div>

            <div className="rating flex flex-col gap-2 justify-center items-center border-b pb-8">
              <div className="rating flex justify-center items-center pt-4 gap-1 text-3xl">
                {renderStars(4.2)}
              </div>
              <p className="text-sm font-bold">Overall Rating</p>
            </div>

            <div className="reviews flex flex-col gap-2">
              {selectedDoctor?.reviews?.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking w-full lg:w-[40%] bg-white p-6 rounded-xl">
          {/* Placeholder for booking UI */}
          <h2 className="text-lg font-semibold text-primary">
            Booking Section Coming Soon
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;

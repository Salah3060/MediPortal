import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/Components/Loader";
import { renderStars } from "@/Utils/functions.util";
import { FaInfo } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import ReviewCard from "./Cards/ReviewCard";
import { BsCashStack } from "react-icons/bs";
import { MdOutlineTimelapse } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { useEffect, useState } from "react";
import ClinicCard from "./Cards/ClinicCard";
import ReactStars from "react-rating-stars-component";
import {
  resetError,
  resetUpdate,
  userReview,
} from "../../Store/Slices/userSlice";
import { toast } from "react-toastify";
import { fetchDoctorById } from "../../Store/Slices/searchSlice";

const DoctorInfo = ({ id }) => {
  const { selectedDoctor, loading, error } = useSelector(
    (state) => state.search
  );
  const { update, error: error2 } = useSelector((state) => state.user);

  const [reviews, setReviews] = useState(5);
  const [rate, setRate] = useState(0);
  const [reviewed, setReview] = useState(false);
  const [textReview, setTextReview] = useState("");
  const [waitingTime, setWaitingTime] = useState("");
  const [availability, setAvailability] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (update) {
      setReview(true);
      toast.success("You have successfully reviewed the doctor");
      dispatch(fetchDoctorById(id));
      dispatch(resetUpdate());
    }
  }, [update]);
  useEffect(() => {
    if (error2) {
      toast.error("You have already review this doctor before!");
      setReview(true);

      dispatch(resetError());
    }
  }, [error2]);
  useEffect(() => {
    if (selectedDoctor && selectedDoctor.availability) {
      // Take the availability and store the objects with unique workspaceId
      const uniqueWorkspaces = [
        ...new Map(
          selectedDoctor.availability.map((item) => [item.workspaceId, item])
        ).values(),
      ];
      setAvailability(uniqueWorkspaces);
    }
  }, [selectedDoctor]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  function handleReview() {
    if (!textReview || !rate || !waitingTime) {
      toast.error("You have to fullfill all the required data!");
      return;
    }
    const data = {
      rate: rate,
      review: textReview,
      waitingTime: waitingTime,
    };
    dispatch(userReview({ data, id }));
  }
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
                src={selectedDoctor?.userimg || "/doctor.png"}
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
                  {renderStars()}
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
          <div className="About bg-white w-full px-6 py-4 rounded-xl flex flex-col gap-4">
            {reviewed ? (
              <h1 className="text-md font-semibold text-secondary">
                You have already reviewed the doctor
              </h1>
            ) : (
              <>
                <div className="head flex items-center gap-4 justify-start">
                  <FaRegStarHalfStroke className="text-lg text-darkRed" />
                  <h1 className="md:text-md text-sm font-semibold text-secondary">
                    Rate Doctor
                  </h1>
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#CA8A04"
                    onChange={(e) => {
                      setRate(e);
                    }}
                  />
                  <input
                    type="number"
                    className="w-[20%] px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="W.time"
                    min="1"
                    max="5"
                    value={waitingTime}
                    onChange={(e) => {
                      if (e.target.value <= 100) setWaitingTime(e.target.value);
                    }}
                  />
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                  placeholder="Write your review here..."
                  onChange={(e) => {
                    setTextReview(e.target.value);
                  }}
                  value={textReview}
                ></textarea>
                <button className="btn-2" onClick={handleReview}>
                  Review
                </button>
              </>
            )}
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
                {renderStars(selectedDoctor?.overallrating || 4.2)}
              </div>
              <p className="text-sm font-bold">Overall Rating</p>
            </div>

            <div className="reviews flex flex-col gap-2">
              {selectedDoctor?.reviews?.slice(0, reviews).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {selectedDoctor?.reviews?.length > reviews && (
              <button
                className="flex justify-center items-center bg-primary text-white py-2 rounded-xl"
                onClick={() => setReviews(reviews + 5)}
              >
                Load More
              </button>
            )}
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking w-full lg:w-[40%] bg-white rounded-xl flex flex-col gap-3 h-[fit-content]">
          <div className="header bg-primary w-full text-center py-3 rounded-t-xl">
            <h1 className="text-tertiary">Booking Information</h1>
          </div>

          <div className="info flex flex-col justify-center items-center border-b pb-4">
            <h1 className="text-primary/60">Book</h1>
            <span className="text-darkRed">Examination</span>
          </div>

          <div className="examination_info flex justify-around items-center gap-2 border-b pb-4">
            <div className="fees flex flex-col justify-center items-center gap-2">
              <BsCashStack className="text-3xl -rotate-45 text-darkRed" />
              <p className="text-primary text-[14px]">
                Fees:{" "}
                <span className="font-semibold">{selectedDoctor?.fees}</span>{" "}
                EGP
              </p>
            </div>
            <div className="waitingTime flex flex-col justify-center items-center gap-2">
              <MdOutlineTimelapse className="text-3xl -rotate-45 text-darkRed" />
              <p className="text-primary text-[14px]">
                Waiting Time:{" "}
                <span className="font-semibold">
                  {selectedDoctor?.averagewaitingtime || 15}
                </span>{" "}
                Min
              </p>
            </div>
          </div>

          <div className="locations flex flex-col gap-2 px-6 py-2">
            <div className="header flex gap-2">
              <ImLocation2 className="text-darkRed text-xl" />
              <h1 className="text-primary font-semibold text-[14px]">
                Available Times and Locations
              </h1>
            </div>
            <div className="av-locations flex w-full">
              <div className="clinics flex flex-col gap-2 items-start mt-6 w-full">
                {selectedDoctor?.availibility?.map((workspace) => (
                  <ClinicCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    setSelectedClinic={setSelectedClinic}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;

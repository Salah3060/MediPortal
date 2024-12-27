import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOfferById } from "@/Store/Slices/offersSlice";
import Loader from "../Components/Loader";
import ErrorPopup from "../Components/ErrorPopup";
import ReviewCard from "../Components/Search/Cards/ReviewCard";
import { ImLocation2 } from "react-icons/im";
import { MdOutlineTimelapse } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { BsCashStack } from "react-icons/bs";
import { renderStars } from "@/Utils/functions.util";
import OffersBreadcrumb from "../Components/Offers/singleOfferPage/OfferBreadcrumb";
import {
  formatPrice,
  getNextDayDate,
  scrollToTop,
} from "../Utils/functions.util";
import { IoCloseSharp } from "react-icons/io5";
import Booking from "../Components/BookingSwiper";
import { toast } from "react-toastify";
import { bookAppointment } from "@/API/appointmentApi";
import { setSelectedDoctor } from "../Store/Slices/searchSlice";

export default function SingleOfferPage() {
  const { offerid } = useParams();
  const [reviewMax, setMax] = useState(4);
  const [availability, setAvail] = useState([]);
  const dispatch = useDispatch();
  const step = 4;
  const {
    error,
    loading,
    selectedOffer,
    selectedDoctor: doctor,
  } = useSelector((state) => state.offers);
  const { status } = useSelector((state) => state.user);
  const [BookDetails, setBookDetials] = useState({
    time: null,
    workingDay: null,
  });
  const dispath = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MediPortal | Offers";
    scrollToTop();
  }, []);
  const handleBooking = async () => {
    try {
      if (status !== "success") {
        toast.error("Please login to book an appointment");
        navigate("/Mediportal/login");
        return;
      }

      if (!BookDetails.workingDay) {
        toast.error("You have to select a timeslot to book");
        return;
      }
      const bookingData = {
        appointmentDate: getNextDayDate(BookDetails.workingDay),
        fees: calcFees(),
        paymentStatus: "Cash",
      };

      const response = await bookAppointment(
        doctor.userid,
        selectedOffer.locations[0],
        bookingData
      );
      toast.success("Appointment booked successfully!");
      toast.success("redirecting to appointments page");
      // wait for 2 seconds before redirecting
      setTimeout(() => {
        dispath(setSelectedDoctor(doctor));
        navigate("/MediPortal/booking/success", {
          state: {
            appointment: response.data.appointment,
            isOffer: true,
            offersFees: calcFees(),
          },
        });
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  const calcAverageRate = function () {
    return doctor?.reviews?.reduce((cum, crnt) => {
      return (cum += crnt.rate / doctor?.reviews.length);
    }, 0);
  };
  const calcFees = function () {
    return (
      selectedOffer?.fees -
      (selectedOffer?.percentage * selectedOffer?.fees) / 100
    );
  };
  const reviewsRef = useRef(null);

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash; // e.g., "#reviews"
      if (hash === "#reviews") {
        reviewsRef.current?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to reviews section
      }
      setMax(doctor?.reviews?.length);
    }
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [doctor?.reviews?.length]);

  useEffect(() => {
    dispatch(getOfferById(offerid));
  }, [dispatch, offerid]);
  useEffect(() => {
    const days = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    const UniqueTimes = [];
    const validForOffer = doctor?.availibility?.filter(
      (el) => el.workSpaceId === selectedOffer.workspaceid
    );

    for (let i = 0; i < 7; i++) {
      const today = [];
      const todaysApps = validForOffer?.filter(
        (el) => el.workingDay === days[i]
      );

      todaysApps?.forEach((el, index) =>
        (todaysApps.findLastIndex(
          (x) => x.startTime === el.startTime && x.endTime === el.endTime
        ) === index &&
          todaysApps.length > 1) ||
        todaysApps.length === 1
          ? today.push(el)
          : false
      );
      today.length
        ? UniqueTimes.push(
            today.sort(
              (a, b) => a.startTime.slice(0, 2) - b.startTime.slice(0, 2)
            )
          )
        : "";
    }

    setAvail(UniqueTimes);
  }, [doctor?.availibility, selectedOffer?.workspaceid]);

  const seeMoreClickHandler = function () {
    if (reviewMax + step >= doctor?.reviews?.length) {
      setMax(doctor?.reviews.length);
    } else setMax((s) => (s += step));
  };
  return (
    <div className="min-h-lvh">
      {error ? (
        <ErrorPopup
          Header="Error"
          Msg="Couldn't load the offer, please try again."
        />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0] min-h-lvh">
            <div className="container max-w-[1300px] mx-auto px-4 py-2 flex flex-col">
              <OffersBreadcrumb offername={selectedOffer?.offername} />

              {/* Main Section */}
              <div className="section flex flex-col lg:flex-row gap-4 w-full mt-2">
                {/* Doctor Information Section */}
                <div className="docInfo flex flex-col gap-4 w-full lg:w-[60%] ">
                  {/* Doctor Card */}
                  <div className="docCard flex flex-col md:flex-row gap-6 bg-white px-6 py-4 rounded-xl">
                    <div className="image flex-shrink-0">
                      <img
                        src={doctor?.userimg || `/doctor.png`}
                        alt="Doctor Image"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                      />
                    </div>
                    <div className="text flex flex-col gap-1 text-secondary">
                      <h2 className="text-lg font-semibold capitalize">
                        Doctor {doctor?.firstname} {doctor?.lastname}
                      </h2>
                      <p className="mt-2">{doctor?.about}</p>
                      <p className="text-[14px]">{doctor?.specialization}</p>
                      <p className="text-darkRed/60 mt-2">
                        Years of experience:{" "}
                        <span className="text-primary font-bold">
                          {doctor?.yearsofexperience}
                        </span>
                      </p>
                      <div className="rating flex items-center gap-2 mt-2">
                        <div className="rating flex justify-center md:justify-start gap-1">
                          {renderStars(calcAverageRate())}
                        </div>
                        <p className="text-[10px] text-primary/60">
                          Overall Rating
                        </p>
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
                    <p className="text-md text-primary">{doctor?.about}</p>
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
                        {renderStars(calcAverageRate())}
                      </div>
                      <p className="text-sm font-bold">Overall Rating</p>
                    </div>

                    <div
                      className="reviews flex flex-col gap-2 items-center"
                      ref={reviewsRef}
                    >
                      {doctor?.reviews?.slice(0, reviewMax).map((review, i) => (
                        <ReviewCard key={i} review={review} />
                      ))}
                      <button
                        className={`btn-2 !px-12 mt-6 mb-4 ${
                          reviewMax < doctor?.reviews?.length ? "" : "!hidden"
                        }`}
                        onClick={seeMoreClickHandler}
                      >
                        See more
                      </button>
                    </div>
                  </div>
                </div>

                {/* Booking Section */}
                <div className="booking w-full lg:w-[40%] bg-white rounded-xl flex flex-col gap-3 -order-1 lg:order-1 h-fit">
                  <div className="header bg-primary w-full text-center py-3 rounded-t-xl">
                    <h1 className="text-tertiary">Booking Information</h1>
                  </div>

                  <div className="examination_info flex justify-around items-center gap-2 border-b py-4">
                    <div className="fees flex flex-col justify-center items-center gap-2">
                      <IoCloseSharp className="text-3xl text-darkRed" />
                      <span className="text-xl font-semibold text-primary/70 line-through">
                        {formatPrice(selectedOffer?.fees)}
                      </span>
                    </div>
                    <div className="fees flex flex-col justify-center items-center gap-2">
                      <BsCashStack className="text-3xl -rotate-45 text-darkRed" />
                      <p>
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(calcFees())}
                        </span>
                      </p>
                    </div>
                    <div className="waitingTime flex flex-col justify-center items-center gap-2">
                      <MdOutlineTimelapse className="text-3xl -rotate-45 text-darkRed" />
                      <p className="text-primary text-[14px]">
                        <span className="text-xl font-bold text-primary">
                          {15}
                        </span>
                        Min
                      </p>
                    </div>
                  </div>
                  <div className="info flex flex-col justify-center items-center border-b py-4">
                    <h1 className="text-green-600 text-2xl font-semibold">
                      Save {selectedOffer?.percentage}%
                    </h1>
                  </div>
                  <div className="locations flex flex-col gap-2 px-6  py-4 border-b">
                    <div className="header flex gap-2 items-center">
                      <ImLocation2 className="text-darkRed text-xl" />
                      <p className=" text-xl font-bold ">
                        {selectedOffer?.workspacename}
                      </p>
                    </div>

                    <div className="av-locations"></div>
                  </div>
                  <div className="locations flex flex-col gap-2 px-6 py-2 pb-4  relative">
                    <div className="header flex gap-2 mb-6">
                      <CiClock1 className="text-darkRed text-xl" />
                      <h1 className="text-primary font-semibold text-[14px]">
                        Choose your appointment
                      </h1>
                    </div>
                    <div className="relative">
                      <Booking
                        data={availability}
                        setBookDetials={setBookDetials}
                        bookHandle={handleBooking}
                      />
                    </div>
                    <div className="av-locations"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

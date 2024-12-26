import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { FaPhoneVolume } from "react-icons/fa6";
import { LuCalendarCheck2 } from "react-icons/lu";
import { getPatient } from "@/API/patientApi";
import { formatDate } from "@/Utils/functions.util";

const SuccessBooking = () => {
  const location = useLocation();
  const appointment = location.state?.appointment;
  const offerFees = location.state?.isOffer && location.state?.offersFees;
  const [loading, setLoading] = useState(true);
  const { selectedDoctor } = useSelector((state) => state.search);
  const [patient, setPatient] = useState(null);

  const { status, firstname, lastname } = useSelector((state) => state.user);

  useEffect(() => {
    // show the loader for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full py-6 bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0]">
      <div className="container max-w-[1100px] mx-auto flex flex-col rounded-xl bg-white text-primary/70 shadow-md">
        {/* Image Section */}
        <div className="image w-full rounded-t-xl bg-transparent">
          <img
            src="/booked.png"
            alt="Booked"
            className="object-cover w-full h-60 sm:h-48 md:h-64 lg:h-64 rounded-t-xl"
          />
        </div>

        {/* Doctor Info Section */}
        <div className="doctorInfo flex flex-col gap-4 border-b-2 pb-4 px-4 md:px-8 py-6">
          <div className="flex items-center gap-4">
            <MdOutlineMarkEmailRead className="text-2xl text-primary" />
            <h1 className="text-sm sm:text-base md:text-lg">
              We notified Doctor:{" "}
              <span className="font-bold">
                {selectedDoctor.firstname} {selectedDoctor.lastname}
              </span>{" "}
              of your booking.
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <BsCash className="text-2xl text-primary" />
            <h1 className="text-sm sm:text-base md:text-lg">
              Examination Fees:{" "}
              <span className="font-bold">
                {offerFees ? offerFees : selectedDoctor.fees} EGP
              </span>
            </h1>
          </div>
        </div>

        {/* Booking Info Section */}
        <div className="bookingInfo flex flex-col gap-4 px-4 md:px-8 py-6">
          <div className="flex items-center gap-4">
            <FaPhoneVolume className="text-2xl text-primary" />
            <h1 className="text-sm sm:text-base md:text-lg">
              Doctor Number:{" "}
              <span className="text-primary font-semibold">
                {selectedDoctor.phonenumber}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full border-b pb-4">
            <LuCalendarCheck2 className="text-2xl text-primary" />
            <h1 className="text-base font-semibold">Booking Details</h1>
          </div>

          {/* Patient Details */}
          <div className="single flex flex-col md:flex-row gap-4 md:gap-16 border-b pb-4">
            <h1 className="font-bold text-sm sm:text-base">Patient name :</h1>
            <h1 className="text-sm sm:text-base">
              {firstname + " " + lastname}
            </h1>
          </div>
          <div className="single flex flex-col md:flex-row gap-4 md:gap-16 border-b pb-4">
            <h1 className="font-bold text-sm sm:text-base">Booking Date :</h1>
            <h1 className="text-sm sm:text-base">
              {formatDate(appointment?.appointmentdate)}
            </h1>
          </div>
          <div className="single flex flex-col md:flex-row gap-4 md:gap-16 border-b pb-4">
            <h1 className="font-bold text-sm sm:text-base">Doctor Name :</h1>
            <h1 className="text-sm sm:text-base">
              {selectedDoctor.firstname + " " + selectedDoctor.lastname}
            </h1>
          </div>
          <div className="single flex flex-col md:flex-row gap-4 md:gap-16 border-b pb-4">
            <h1 className="font-bold text-sm sm:text-base">Waiting Time :</h1>
            <h1 className="text-sm sm:text-base">
              {selectedDoctor.yearsofexperience} min
            </h1>{" "}
          </div>
          <div className="single flex flex-col md:flex-row gap-4 md:gap-16 border-b pb-4">
            <h1 className="font-bold text-sm sm:text-base">Clinic Address:</h1>
            <h1 className="text-sm sm:text-base">To be updated later</h1>
          </div>
        </div>

        <Link
          className="w-full px-6 py-4"
          to={"/MediPortal/patient/myappointments"}
        >
          <button className="bg-primary text-white py-2 px-4 rounded-xl w-full ">
            My Appointments
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessBooking;

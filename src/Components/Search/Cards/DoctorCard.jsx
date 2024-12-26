import propTypes from "prop-types";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { renderStars } from "@/Utils/functions.util";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  return (
    <Link
      className="flex flex-col md:flex-row justify-between px-4 py-6 w-full bg-white rounded-t-xl text-primary hover:bg-gray-200 transition-all duration-300 shadow-lg"
      to={`/MediPortal/search/doctors/${doctor.userid}`}
    >
      <div className="info flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-full">
        <div className="image w-full md:w-[35%] flex justify-center md:justify-start">
          <img
            src={doctor.userimg || "/doctor.png"}
            alt="Doctor Image"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
          />
        </div>
        <div className="text w-full">
          <p className="text-md text-center md:text-left">
            Doctor{" "}
            <span className="text-lg font-semibold">
              {doctor.firstname} {doctor.lastname}
            </span>
          </p>
          <p className="text-md text-primary/80 text-center md:text-left">
            {doctor.about}
          </p>

          <div className="rating flex justify-center md:justify-start gap-1 mt-4">
            {renderStars(doctor.overallrating)}
          </div>

          <p className="text-md text-primary/80 text-center md:text-left mt-2">
            Waiting Time: {doctor.averagewaitingtime} minutes
          </p>
        </div>
        <div className="feats flex flex-col gap-2 w-full">
          <div className="feat flex items-center gap-2 justify-center md:justify-start">
            <FaUserDoctor className="text-lg text-darkRed" />
            <p className="text-[14px]">{doctor.specialization}</p>
          </div>
          <div className="feat flex items-center gap-2 justify-center md:justify-start">
            <MdOutlineLocationOn className="text-lg text-darkRed" />
            <p className="text-[14px]">{doctor?.cliniclocation}</p>
          </div>
          <div className="feat flex items-center gap-2 justify-center md:justify-start">
            <BsCashStack className="text-lg text-darkRed" />
            <p className="text-[14px]">Fees: {doctor.fees} EGP</p>
          </div>
          <div className="feat flex items-center gap-2 justify-center md:justify-start">
            <FaRegClock className="text-lg text-darkRed" />
            <p className="text-[14px] text-tertiary/90">
              Waiting Time: {doctor?.averagewaitingtime}
            </p>
          </div>
          <div className="feat flex items-center gap-2 justify-center md:justify-start">
            <IoCallOutline className="text-lg text-darkRed" />
            <p className="text-[14px]">16676 - Cost of regular Call</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

DoctorCard.propTypes = {
  doctor: propTypes.object.isRequired,
};

export default DoctorCard;

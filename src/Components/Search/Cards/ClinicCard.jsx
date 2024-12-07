import propTypes from "prop-types";
import { BsCalendar2Date } from "react-icons/bs";
import { formatTime, getNextDayDate } from "@/Utils/functions.util";
import { useEffect, useState } from "react";
import { bookAppointment } from "@/API/appointmentApi";
import { useSelector } from "react-redux";

const ClinicCard = ({ workspace }) => {
  const { selectedDoctor } = useSelector((state) => state.search);

  const [bookingData, setBookingData] = useState({
    fees: selectedDoctor.fees,
  });

  useEffect(() => {
    console.log(workspace);
  }, [workspace]);

  const handleBooking = (day, paymentStatus) => {};

  return (
    <div className="flex w-full flex-col gap-4 border-b pb-4 mt-2">
      {/* Date and Time Section */}
      <div className="dateAndTime flex justify-between w-full">
        <div className="day flex items-center gap-2">
          <BsCalendar2Date className="text-darkRed" />
          <p className="text-primary">
            {workspace.workingDay || "Unknown Day"}
          </p>
        </div>
        <div className="time flex gap-4">
          <p className="text-primary">
            {workspace.startTime ? formatTime(workspace.startTime) : "N/A"}
          </p>
          <p className="text-primary">-</p>
          <p className="text-primary">
            {workspace.endTime ? formatTime(workspace.endTime) : "N/A"}
          </p>
        </div>
      </div>

      {/* Locations Section */}
      <div className="locations flex flex-col gap-4">
        {workspace.locations ? (
          workspace.locations.map((location) => (
            <div
              key={location.locationId}
              className="location flex items-center gap-2 justify-between"
              onClick={() => console.log(location)}
            >
              <p className="text-primary">{location.workspacesLocation}</p>
              <button className="bg-primary px-6 py-1 text-tertiary rounded-xl">
                Book
              </button>
            </div>
          ))
        ) : (
          <p className="text-primary">No locations available</p>
        )}
      </div>
    </div>
  );
};

ClinicCard.propTypes = {
  workspace: propTypes.shape({
    workingDay: propTypes.string,
    startTime: propTypes.string,
    endTime: propTypes.string,
    locations: propTypes.array,
  }),
  setSelectedClinic: propTypes.func,
};

export default ClinicCard;

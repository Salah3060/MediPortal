import propTypes from "prop-types";
import { BsCalendar2Date } from "react-icons/bs";
import { formatTime, getNextDayDate } from "@/Utils/functions.util";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { bookAppointment } from "@/API/appointmentApi";
import Loader from "@/Components/Loader";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Ensure accessibility by linking the app's root

const ClinicCard = ({ workspace }) => {
  const navigate = useNavigate();
  const { selectedDoctor } = useSelector((state) => state.search);

  const { status, firstname, lastname } = useSelector((state) => state.user);

  const [bookingData, setBookingData] = useState({
    fees: selectedDoctor.fees,
    appointmentDate: getNextDayDate(workspace.workingDay),
    paymentStatus: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("Cash");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    console.log(workspace);
  }, [workspace]);

  const generateTimeSlots = () => {
    if (workspace.startTime && workspace.endTime) {
      const start = new Date(`1970-01-01T${workspace.startTime}`);
      const end = new Date(`1970-01-01T${workspace.endTime}`);
      const slots = [];
      while (start < end) {
        slots.push(formatTime(start.toTimeString().slice(0, 5))); // Format to "HH:MM"
        start.setHours(start.getHours() + 1, 0, 0, 0); // Increment hour and reset minutes
      }
      return slots.map((time) => ({ value: time, label: time }));
    }
    return [];
  };

  const openModal = () => {
    if (status !== "success") {
      toast.error("Please login to book an appointment");
      return;
    }
    const slots = generateTimeSlots();
    setTimeSlots(slots);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleBooking = async () => {
    setLoading(true); // Show loader
    setModalOpen(false); // Close modal
    try {
      const response = await bookAppointment(
        selectedDoctor.userid,
        workspace.workspaceId,
        bookingData
      );
      toast.success("Appointment booked successfully!");
      toast.success("redirecting to appointments page");
      // wait for 2 seconds before redirecting
      setTimeout(() => {
        navigate("/MediPortal/booking/success", {
          state: { appointment: response.data.appointment, isOffer: false },
        });
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

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
            >
              <p className="text-primary">{location.workspacesLocation}</p>
              <button
                className="bg-primary px-6 py-1 text-tertiary rounded-xl"
                onClick={openModal}
              >
                Book
              </button>
            </div>
          ))
        ) : (
          <p className="text-primary">No locations available</p>
        )}
      </div>

      {/* Modal Section */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal-content bg-white p-6 rounded-lg shadow-xl mx-auto w-[800px]"
        overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
        <div className="flex flex-col gap-4 w-full">
          {/* Name Input Fields */}
          <div className="w-full flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="input-field border p-2 rounded-lg w-[50%]"
              value={firstname}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              className="input-field border p-2 rounded-lg w-[50%]"
              value={lastname}
              onChange={handleInputChange}
            />
          </div>

          {/* Time Slot Dropdown */}
          <select
            name="time"
            className="input-field border p-2 rounded-lg"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>

          {/* Payment Method Buttons */}
          <div className="payment-method flex gap-4 w-full">
            <button
              type="button"
              className={`px-6 py-2 rounded-lg w-1/2 ${
                paymentStatus === "Cash"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => {
                setPaymentStatus("Cash");
                setBookingData({ ...bookingData, paymentStatus: "Cash" });
              }}
            >
              Cash
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded-lg w-1/2 ${
                paymentStatus === "Credit"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => {
                setPaymentStatus("Credit");
                setBookingData({ ...bookingData, paymentStatus: "Credit" });
              }}
            >
              Credit
            </button>
          </div>

          {/* Confirm and Close Buttons */}
          <button
            type="button"
            className="bg-primary px-6 py-2 text-tertiary rounded-lg"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
          <button
            type="button"
            className="close-modal bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Loader Section */}
      {loading && <Loader />}
    </div>
  );
};

ClinicCard.propTypes = {
  workspace: propTypes.shape({
    workspaceId: propTypes.string,
    workingDay: propTypes.string,
    startTime: propTypes.string,
    endTime: propTypes.string,
    locations: propTypes.array,
  }),
  setSelectedClinic: propTypes.func,
};

export default ClinicCard;

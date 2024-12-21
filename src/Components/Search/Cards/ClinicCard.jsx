import propTypes from "prop-types";
import { BsCalendar2Date } from "react-icons/bs";
import { formatTime } from "@/Utils/functions.util";
import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { bookAppointment, createStripeSession } from "@/API/appointmentApi";
import Loader from "@/Components/Loader";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { setSelectedDoctor } from "@/Store/Slices/searchSlice";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root"); // Ensure accessibility by linking the app's root

const ClinicCard = ({ workspace }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedDoctor } = useSelector((state) => state.search);
  const { status, firstname, lastname } = useSelector((state) => state.user);

  // Helper to calculate the next occurrence of a working day
  const calculateNextWorkingDate = (workingDay) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const today = new Date();
    const targetDayIndex = daysOfWeek.indexOf(workingDay);

    if (targetDayIndex === -1) {
      return "Nothing";
    }

    const currentDayIndex = today.getDay();
    let daysToAdd = targetDayIndex - currentDayIndex;

    if (daysToAdd <= 0) {
      daysToAdd += 7; // Ensure the next occurrence of the day is in the future
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);
    return nextDate.toISOString().split("T")[0]; // Return YYYY-MM-DD
  };

  const [bookingData, setBookingData] = useState({
    fees: selectedDoctor.fees,
    appointmentDate: calculateNextWorkingDate(workspace?.workingDay),
    paymentStatus: "Cash",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("Cash");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const generateTimeSlots = () => {
    if (workspace.startTime && workspace.endTime) {
      const parseTime = (timeString) => {
        const [time, modifier] = timeString.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
          hours += 12; // Convert PM to 24-hour time
        } else if (modifier === "AM" && hours === 12) {
          hours = 0; // Convert midnight to 0 hours
        }

        return { hours, minutes };
      };

      const { hours: startHours, minutes: startMinutes } = parseTime(
        workspace.startTime
      );
      const { hours: endHours, minutes: endMinutes } = parseTime(
        workspace.endTime
      );

      const start = new Date(1970, 0, 1, startHours, startMinutes);
      const end = new Date(1970, 0, 1, endHours, endMinutes);
      const slots = [];

      while (start <= end) {
        slots.push(
          start.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
        start.setHours(start.getHours() + 1, 0, 0, 0); // Increment hour
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
      const selectedDate = bookingData.appointmentDate;
      const selectedTimeObj = timeSlots.find(
        (slot) => slot.value === selectedTime
      );

      if (!selectedTimeObj) {
        toast.error("Please select a valid time slot.");
        setLoading(false);
        return;
      }

      const [time, modifier] = selectedTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      } else if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(hours, minutes, 0, 0);

      const formattedAppointmentDate = appointmentDate.toISOString(); // 1985-09-24T21:00:00.000Z

      const bookingPayload = {
        ...bookingData,
        appointmentDate: formattedAppointmentDate,
      };

      if (bookingPayload.paymentStatus === "Online") {
        const response = await createStripeSession(
          selectedDoctor.userid,
          workspace.locationId,
          formattedAppointmentDate
        );

        dispatch(setSelectedDoctor(response.doctor));

        if (response.status === 200) {
          const stripeSessionId = response.data.session.id;
          const stripePromise = loadStripe(
            "pk_test_51QSgbWDCPB1zCmR3dCA8lpR7G211680TnxBZvOzxMLBysBUNrT0QTIesMkSqssVGfXRkAy265P91ufO0cql2ZOMP00vrDWtziR"
          );
          const stripe = await stripePromise;

          await stripe.redirectToCheckout({ sessionId: stripeSessionId });
        }
      } else {
        console.log("Booking payload: ", bookingPayload);
        console.log("Selected doctor: ", selectedDoctor);
        console.log("Workspace location ID: ", workspace.locationId);
        const response = await bookAppointment(
          selectedDoctor.userid,
          workspace.locationId,
          bookingPayload
        );
        console.log(response);
        toast.success("Appointment booked successfully!");
        setTimeout(() => {
          navigate("/MediPortal/booking/success", {
            state: { appointment: response.data.appointment, isOffer: false },
          });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
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
        <div
          key={workspace.locationId}
          className="location flex items-center gap-2 justify-between"
        >
          <p className="text-primary">{workspace.location}</p>
          <button
            className="bg-primary px-6 py-1 text-tertiary rounded-xl"
            onClick={openModal}
          >
            Book
          </button>
        </div>
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
                paymentStatus === "Online"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => {
                setPaymentStatus("Online");
                setBookingData({ ...bookingData, paymentStatus: "Online" });
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
    locationId: propTypes.string,
    location: propTypes.string,
    locations: propTypes.array,
  }),
  setSelectedClinic: propTypes.func,
};

export default ClinicCard;

import { PiHandHeart } from "react-icons/pi";
import { TbUsersPlus } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GrShield } from "react-icons/gr";

const Features = () => {
  return (
    <div className="container max-w-[1500px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="feat flex flex-col items-center text-center gap-4">
          <PiHandHeart className="text-5xl text-tertiary animate-pulse" />
          <h1 className="text-primary font-bold text-xl">
            All your healthcare needs
          </h1>
          <p className="text-primary/60 text-lg">
            Search and book a clinic visit. Order your medicine and book a
            service or operation.
          </p>
        </div>
        <div className="feat flex flex-col items-center text-center gap-4">
          <TbUsersPlus className="text-5xl text-tertiary animate-pulse" />
          <h1 className="text-primary font-bold text-xl">
            Verified patient reviews
          </h1>
          <p className="text-primary/60 text-lg">
            Doctor ratings are from patients who booked and visited the doctor
            through MediPortal.
          </p>
        </div>
        <div className="feat flex flex-col items-center text-center gap-4">
          <FaRegCalendarCheck className="text-5xl text-tertiary animate-pulse" />
          <h1 className="text-primary font-bold text-xl">
            Your booking is confirmed
          </h1>
          <p className="text-primary/60 text-lg">
            Your booking is automatically confirmed, as the doctor specifies his
            working hours and is notified of the booking details.
          </p>
        </div>
        <div className="feat flex flex-col items-center text-center gap-4">
          <GrShield className="text-5xl text-tertiary animate-pulse" />
          <h1 className="text-primary font-bold text-xl">
            Book for free, and pay in the clinic
          </h1>
          <p className="text-primary/60 text-lg">
            The consultation fees stated on MediPortal are the actual doctor
            {"'"}s fees with no extra charges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

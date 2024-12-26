import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Large Screen Pharmacy Section
const PharmacySectionLargeScreen = () => {
  return (
    <div className="pharmacy flex justify-between bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0] ps-[40px] py-[35px] rounded-xl shadow-lg">
      <div className="text flex flex-col gap-[14px]">
        <h1 className="text-primary text-2xl font-bold">Pharmacy</h1>
        <p className="text-primary/85 font-semibold">
          Get your medicine and all your pharmacy needs
        </p>
        <Link
          className="px-[24px] py-[10px] text-lg font-semibold w-[fit-content] bg-white rounded-lg hover:bg-primary hover:text-tertiary text-primary transition duration-300 ease-in-out"
          to={"/MediPortal/pharmacy"}
        >
          Place Order
        </Link>
      </div>
      <div className="img w-64 h-[125px] flex items-center justify-center">
        <img
          className="object-contain rounded-br-lg"
          src="/store.png"
          alt="pharmacy"
        />
      </div>
    </div>
  );
};

// Small Screen Pharmacy Section
const PharmacySectionSmallScreen = () => {
  return (
    <div className="pharmacy flex flex-col gap-6 bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0] px-4 py-6 rounded-xl shadow-lg">
      <h1 className="text-primary text-xl font-bold text-center">Pharmacy</h1>
      <p className="text-primary/85 text-sm font-semibold text-center">
        Get your medicine and all your pharmacy needs
      </p>
      <Link
        className="px-[20px] py-[8px] text-sm font-semibold w-full bg-white rounded-lg text-center hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out"
        to={"/MediPortal/pharmacy"}
      >
        Place Order
      </Link>
    </div>
  );
};

// Large Screen Questions Section
const QuestionsSectionLargeScreen = () => {
  return (
    <div className="question rounded-xl shadow-lg px-[40px] py-[35px] flex flex-col gap-[14px] bg-white">
      <h1 className="text-primary text-2xl font-bold">
        Have a medical question?
      </h1>
      <p className="text-primary/80 font-semibold">
        Submit your medical question and receive an answer from a specialized
        doctor
      </p>
      <div className="flex gap-8">
        <Link
          className="px-[24px] py-[10px] text-lg font-semibold bg-[#c2dfe3] w-[fit-content] rounded-lg text-primary hover:bg-primary hover:text-tertiary  transition duration-300 ease-in-out"
          to={"/MediPortal/askquestion"}
        >
          Ask Now
        </Link>
        <Link
          className="px-[24px] py-[10px] text-lg font-semibold bg-[#c2dfe3] w-[fit-content] rounded-lg text-primary hover:bg-primary hover:text-tertiary  transition duration-300 ease-in-out"
          to={"/MediPortal/questions"}
        >
          See All Questions
        </Link>
      </div>
    </div>
  );
};

// Small Screen Questions Section
const QuestionsSectionSmallScreen = () => {
  return (
    <div className="question flex flex-col gap-4 px-4 py-6 rounded-xl shadow-lg bg-white">
      <h1 className="text-primary text-xl font-bold text-center">
        Have a medical question?
      </h1>
      <p className="text-primary/80 text-sm font-semibold text-center">
        Submit your medical question and receive an answer from a specialized
        doctor
      </p>
      <Link
        className="px-[20px] py-[8px] text-sm font-semibold w-full bg-[#c2dfe3] rounded-lg text-center text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out"
        to={"/MediPortal/askquestion"}
      >
        Ask Now
      </Link>
      <Link
        className="px-[20px] py-[8px] text-sm font-semibold w-full bg-[#c2dfe3] rounded-lg text-center text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out"
        to={"/MediPortal/questions"}
      >
        See All Questions
      </Link>
    </div>
  );
};

// Main Component
const NewServices = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  // Update state based on screen size
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container max-w-[1500px] mx-auto flex flex-col gap-10 px-4 py-6">
      {/* Conditional Rendering Based on Screen Size */}
      {isLargeScreen ? (
        <QuestionsSectionLargeScreen />
      ) : (
        <QuestionsSectionSmallScreen />
      )}
      {isLargeScreen ? (
        <PharmacySectionLargeScreen />
      ) : (
        <PharmacySectionSmallScreen />
      )}
    </div>
  );
};

export default NewServices;

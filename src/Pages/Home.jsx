import { useState, useEffect } from "react";
import Landing from "@/Components/Home/Landing";
import NewServices from "@/Components/Home/NewServices";
import HomeOffers from "@/Components/Home/HomeOffers";
import Specialities from "@/Components/Home/Specialties";
import Features from "@/Components/Home/Features";

const Home = () => {
  const images = [
    "/MediPortal/Home/back1.jpg",
    "/MediPortal/Home/back2.jpg",
    "/MediPortal/Home/back3.jpg",
  ];

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change image every 4 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      {/* Div with dynamic background */}
      <div
        className="w-full min-h-[600px]"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1.5s ease-in-out",
        }}
      >
        <Landing />
      </div>
      <div className="w-full bg-[#e0fbfc] py-8">
        <NewServices />
      </div>
      <div className="w-full bg-white">
        <HomeOffers />
      </div>
      <div className="w-full bg-[#e0fbfc] py-4">
        <Specialities />
      </div>
      <Features />
    </div>
  );
};

export default Home;

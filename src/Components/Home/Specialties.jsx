import SpecialtyCard from "./Cards/SpecialtyCard";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../Styles/styles.css";
import "swiper/swiper-bundle.css"; // For Swiper v8+

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

const Specialties = () => {
  const specialties = [
    {
      id: 1,
      title: "Dental",
      image: "https://placehold.co/400x220",
    },
    {
      id: 2,
      title: "Eye",
      image: "https://placehold.co/400x220",
    },
    {
      id: 3,
      title: "Skin",
      image: "https://placehold.co/400x220",
    },
    {
      id: 4,
      title: "Hair",
      image: "https://placehold.co/400x220",
    },
    {
      id: 1,
      title: "Dental",
      image: "https://placehold.co/400x220",
    },
    {
      id: 2,
      title: "Eye",
      image: "https://placehold.co/400x220",
    },
    {
      id: 3,
      title: "Skin",
      image: "https://placehold.co/400x220",
    },
    {
      id: 4,
      title: "Hair",
      image: "https://placehold.co/400x220",
    },
    {
      id: 1,
      title: "Dental",
      image: "https://placehold.co/400x220",
    },
    {
      id: 2,
      title: "Eye",
      image: "https://placehold.co/400x220",
    },
    {
      id: 3,
      title: "Skin",
      image: "https://placehold.co/400x220",
    },
    {
      id: 4,
      title: "Hair",
      image: "https://placehold.co/400x220",
    },
  ];
  return (
    <div className="container max-w-[1500px] mx-auto px-4 py-6 flex flex-col gap-8">
      {/* Header Section */}
      <div className="headerText flex justify-between items-center">
        <h1 className="text-secondary text-3xl font-bold">
          Book from top specialties
        </h1>
      </div>

      {/* Swiper Section */}
      <div className="specialties w-full">
        <Swiper
          slidesPerView={1} // Default for small screens
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {specialties.map((specialty) => (
            <SwiperSlide key={specialty.id}>
              <SpecialtyCard specialty={specialty} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Specialties;

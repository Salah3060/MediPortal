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

import { getAllSpecialties } from "@/API/DoctorsApi";
import { setSpecialties } from "@/Store/Slices/searchSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Specialties = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        let count = 1;
        const specialtiessss = await getAllSpecialties();
        console.log(specialtiessss);
        // loop on and make a new list and add id and image to them
        const specialtiesbb = specialtiessss.map((specialty) => ({
          id: count++,
          title: specialty.specialization,
          image:
            specialty.img ||
            `https://res.cloudinary.com/djuhk9ozp/image/upload/v1734793337/${specialty.specialization}.png`,
        }));
        dispatch(setSpecialties(specialtiesbb));
      } catch (error) {
        console.log("Error fetching specialties: ", error.message);
      }
    };
    fetchSpecialties();
  }, [dispatch]);

  const { specialties } = useSelector((state) => state.search);

  return (
    <div className="container max-w-[1500px] mx-auto px-4 py-6 flex flex-col gap-8">
      {/* Header Section */}
      <div className="headerText flex justify-between items-center">
        <h1 className="text-secondary text-xl md:text-3xl font-bold">
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

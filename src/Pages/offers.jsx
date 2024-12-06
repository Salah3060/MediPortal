import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import "../Styles/offersSlider.css";
import Card from "../Components/Offers/card";
import { Link } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
export default function Offers() {
  const images = [
    "/MediPortal/Offers/offer1.jpg",
    "/MediPortal/Offers/offer2.jpg",
  ];
  return (
    <div className="flex flex-col justify-center items-center gap-y-10 my-8">
      <Swiper
        modules={[Autoplay]}
        pagination={true}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={3500}
      >
        {images.map((el, i) => {
          return (
            <SwiperSlide className="ImageSlide" key={i}>
              <img src={el} alt="Offers" className="w-2/3" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex flex-col justify-center container">
        <div className="section mb-52">
          <div className="headder flex justify-between mb-3 items-center">
            <h2 className="text-secondary text-3xl font-bold mb-5">
              All Offers
            </h2>
            <Link
              className="px-4 py-2 font-semibold bg-[#c2dfe3] w-[fit-content] rounded-lg text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out flex items-center"
              to={"/MediPortal/offers"}
            >
              Show All
              <FaCircleArrowRight className="text-xl ml-2" />
            </Link>
          </div>
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            breakpoints={{
              480: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
            <SwiperSlide>
              <Card />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

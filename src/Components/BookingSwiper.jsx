/* eslint-disable react/prop-types */
import Card from "../Components/Offers/singleOfferPage/BookingCard";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

export default function Booking({ data, setBookDetials, bookHandle }) {
  const [clickTimeSlot, setTimeSlot] = useState(null);
  const [selectedDay, setDay] = useState(null);
  function handleClick(i, workingDay, details) {
    if (clickTimeSlot === i && selectedDay === workingDay) {
      setBookDetials(null);
      setTimeSlot(null);
      setDay(null);
    } else {
      setBookDetials(details);
      setTimeSlot(i);
      setDay(workingDay);
    }
  }
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 1 },
          1200: { slidesPerView: 2 },
        }}
        // navigation={{
        //   nextEl: ".custom-next",
        //   prevEl: ".custom-previous",
        // }}
        className="mySwiper"
      >
        {data?.map((el, i) => (
          <SwiperSlide key={i} className="!h-72 !w-52">
            <Card
              day={el}
              clickTimeSlot={clickTimeSlot}
              selectedDay={selectedDay}
              handleClick={handleClick}
              bookHandle={bookHandle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="absolute top-1/2 flex justify-between w-full -translate-y-1/2 z-10">
        <FaArrowLeft className="custom-previous  text-2xl text-primary" />
        <FaArrowRight className=" custom-next text-2xl text-primary" />
      </div> */}
    </>
  );
}

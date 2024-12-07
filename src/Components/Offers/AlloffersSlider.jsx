/* eslint-disable react/prop-types */
import { Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import Card from "./card";

export default function ShowOffers({ offers = [] }) {
  return (
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
      {offers?.map((el, i) => {
        return (
          <SwiperSlide key={i}>
            <Card
              ratio={el.percentage}
              id={el.offerid}
              header={el.offername}
              description={el.offerdescription}
              previousPrice={el.fees}
              currentPrice={el.fees - (el.percentage * el.fees) / 100}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

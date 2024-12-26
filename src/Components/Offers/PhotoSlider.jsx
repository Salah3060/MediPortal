import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function PhotoSlider() {
  const images = ["./offer1.jpg", "./offer2.jpg"];
  return (
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
  );
}

import { Link } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import OfferCard from "./Cards/OfferCard";

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

const HomeOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Tooth Cleaning",
      image: "https://placehold.co/400x220",
      discount: "30% OFF",
      oldPrice: 500,
      newPrice: 350,
      numberOfOffers: 120,
    },
    {
      id: 2,
      title: "Dental Checkup",
      image: "https://placehold.co/400x220",
      discount: "20% OFF",
      oldPrice: 300,
      newPrice: 240,
      numberOfOffers: 100,
    },
    {
      id: 3,
      title: "Eye Checkup",
      image: "https://placehold.co/800x820",
      discount: "15% OFF",
      oldPrice: 200,
      newPrice: 170,
      numberOfOffers: 80,
    },
    {
      id: 1,
      title: "Tooth Cleaning",
      image: "https://placehold.co/400x220",
      discount: "30% OFF",
      oldPrice: 500,
      newPrice: 350,
      numberOfOffers: 120,
    },
    {
      id: 2,
      title: "Dental Checkup",
      image: "https://placehold.co/400x220",
      discount: "20% OFF",
      oldPrice: 300,
      newPrice: 240,
      numberOfOffers: 100,
    },
    {
      id: 3,
      title: "Eye Checkup",
      image: "https://placehold.co/800x820",
      discount: "15% OFF",
      oldPrice: 200,
      newPrice: 170,
      numberOfOffers: 80,
    },
    {
      id: 1,
      title: "Tooth Cleaning",
      image: "https://placehold.co/400x220",
      discount: "30% OFF",
      oldPrice: 500,
      newPrice: 350,
      numberOfOffers: 120,
    },
    {
      id: 2,
      title: "Dental Checkup",
      image: "https://placehold.co/400x220",
      discount: "20% OFF",
      oldPrice: 300,
      newPrice: 240,
      numberOfOffers: 100,
    },
    {
      id: 3,
      title: "Eye Checkup",
      image: "https://placehold.co/800x820",
      discount: "15% OFF",
      oldPrice: 200,
      newPrice: 170,
      numberOfOffers: 80,
    },
    {
      id: 1,
      title: "Tooth Cleaning",
      image: "https://placehold.co/400x220",
      discount: "30% OFF",
      oldPrice: 500,
      newPrice: 350,
      numberOfOffers: 120,
    },
    {
      id: 2,
      title: "Dental Checkup",
      image: "https://placehold.co/400x220",
      discount: "20% OFF",
      oldPrice: 300,
      newPrice: 240,
      numberOfOffers: 100,
    },
    {
      id: 3,
      title: "Eye Checkup",
      image: "https://placehold.co/800x820",
      discount: "15% OFF",
      oldPrice: 200,
      newPrice: 170,
      numberOfOffers: 80,
    },
    // Add more offer objects as needed
  ];

  return (
    <div className="container max-w-[1500px] mx-auto px-4 py-6 flex flex-col gap-8">
      {/* Header Section */}
      <div className="headerText flex justify-between items-center">
        <h1 className="text-secondary text-3xl font-bold">
          Choose from top offers
        </h1>
        <Link
          className="px-4 py-2 font-semibold bg-[#c2dfe3] w-[fit-content] rounded-lg text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out flex items-center"
          to={"/MediPortal/offers"}
        >
          All Offers
          <FaCircleArrowRight className="text-xl ml-2" />
        </Link>
      </div>

      {/* Swiper Section */}
      <div className="offers w-full py-2">
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
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <OfferCard offer={offer} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeOffers;

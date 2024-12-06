import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import "../Styles/offersSlider.css";
import Card from "../Components/Offers/card";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/Components/Loader";
import { fetchAllOffers } from "../Store/Slices/offersSlice";
import { useEffect, useState } from "react";
import ErrorPopup from "../Components/ErrorPopup";
import AllOffers from "../Components/Offers/AlloffersSlider";
import OffersSection from "../Components/Offers/OffersSection";
import Expandit from "../Components/Offers/ShowAll";
export default function Offers() {
  const images = [
    "/MediPortal/Offers/offer1.jpg",
    "/MediPortal/Offers/offer2.jpg",
  ];
  const [cat, setCat] = useState("");
  const [Beauty, setBeautyData] = useState([]);
  const [Eye, setEyeData] = useState([]);
  const [Hair, setHairData] = useState([]);
  const [Dental, setDentalData] = useState([]);

  const { offers, loading, error } = useSelector((state) => state.offers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!offers.length) dispatch(fetchAllOffers());
    setBeautyData(
      offers.filter((el) => el.specialization === "Orthopedic Surgeon")
    );
    setEyeData(offers.filter((el) => el.specialization === "Pediatrician"));
    setHairData(
      offers.filter((el) => el.specialization === "General Practitioner")
    );
    setDentalData(offers.filter((el) => el.specialization === "Cardiologist"));
  }, [dispatch, offers]);
  function BackHandler() {
    setCat("");
  }
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

      {cat === "All" ? (
        <Expandit data={offers} backHandler={BackHandler} />
      ) : cat === "Dental" ? (
        <Expandit data={Dental} backHandler={BackHandler} />
      ) : cat === "Hair" ? (
        <Expandit data={Hair} backHandler={BackHandler} />
      ) : cat === "Beauty" ? (
        <Expandit data={Beauty} backHandler={BackHandler} />
      ) : cat === "Eye" ? (
        <Expandit data={Eye} backHandler={BackHandler} />
      ) : error ? (
        <ErrorPopup
          Msg="Couldn't load offers, please check your connection"
          Header="Error"
        />
      ) : loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center container gap-y-10">
          <OffersSection
            header="All Offers"
            data={offers}
            expandHandler={() => setCat("All")}
          />
          <OffersSection
            header="Beauty"
            data={Beauty}
            expandHandler={() => setCat("Beauty")}
          />
          <OffersSection
            header="Eye"
            data={Eye}
            expandHandler={() => setCat("Eye")}
          />
          <OffersSection
            header="Hair"
            data={Hair}
            expandHandler={() => setCat("Hair")}
          />
          <OffersSection
            header="Dental"
            data={Dental}
            expandHandler={() => setCat("Dental")}
          />
        </div>
      )}
    </div>
  );
}

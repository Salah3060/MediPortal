import "../Styles/offersSlider.css";

import { useDispatch, useSelector } from "react-redux";
import Loader from "@/Components/Loader";
import { fetchAllOffers } from "../Store/Slices/offersSlice";
import { useEffect, useState } from "react";
import ErrorPopup from "../Components/ErrorPopup";
import OffersSection from "../Components/Offers/OffersSection";
import Expandit from "../Components/Offers/ShowAll";
import PhotoSlider from "../Components/Offers/PhotoSlider";
import { scrollToTop } from "../Utils/functions.util";
export default function Offers() {
  const [cat, setCat] = useState("");
  const [Beauty, setBeautyData] = useState([]);
  const [Eye, setEyeData] = useState([]);
  const [Hair, setHairData] = useState([]);
  const [Dental, setDentalData] = useState([]);

  const { offers, loading, error } = useSelector((state) => state.offers);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "MediPortal | Offers";
    scrollToTop();
  }, []);
  useEffect(() => {
    if (!offers.length) dispatch(fetchAllOffers());
    setBeautyData(offers.filter((el) => el.specialization === "Skin"));
    setEyeData(offers.filter((el) => el.specialization === "Eye"));
    setHairData(offers.filter((el) => el.specialization === "Hair"));
    setDentalData(offers.filter((el) => el.specialization === "Dentist"));
  }, [dispatch, offers]);

  function BackHandler() {
    setCat("");
  }
  return (
    <div className="flex flex-col justify-center items-center gap-y-10 my-8">
      <PhotoSlider />

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

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOfferById } from "@/Store/Slices/offersSlice";
import Loader from "../Components/Loader";
import ErrorPopup from "../Components/ErrorPopup";

export default function SingleOfferPage() {
  const { offerid } = useParams();

  const dispatch = useDispatch();

  const { loading, error, selectedOffer } = useSelector(
    (state) => state.offers
  );

  useEffect(() => {
    dispatch(getOfferById(offerid));
  }, [dispatch, offerid]);

  return (
    <div className="min-h-lvh">
      {error ? (
        <ErrorPopup
          Header="Error"
          Msg="Couldn't load the offer, please try again."
        />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <p>firstName:{selectedOffer?.firstname}</p>
          <p>lastName:{selectedOffer?.lastname}</p>
        </>
      )}
    </div>
  );
}

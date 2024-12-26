/* eslint-disable react/prop-types */
import { GoHome } from "react-icons/go";
import { PiSealPercentLight } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function OffersBreadcrumb({ offername }) {
  return (
    <div className="w-full py-2 Header text-[12px]">
      <div className="container max-w-screen-2xl mx-auto">
        <p className="flex gap-2">
          <Link className="flex gap-2 items-center text-secondary" to={"/"}>
            <GoHome className="text-lg" />
            <span>MediPort</span>
          </Link>
          <span>/</span>

          <Link
            className="flex gap-2 items-center text-secondary"
            to={"/MediPortal/offers"}
          >
            <PiSealPercentLight className="text-lg" />
            <span>Offers</span>
          </Link>
          <span>/</span>

          <span className="text-primary capitalize font-semibold">
            offer: {offername}
          </span>
        </p>
      </div>
    </div>
  );
}

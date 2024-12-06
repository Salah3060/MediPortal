/* eslint-disable react/prop-types */
import { FaCircleArrowRight } from "react-icons/fa6";
import ShowOffers from "./AlloffersSlider";

export default function OffersSection({ header, data, expandHandler }) {
  return (
    <div className="section border-t pt-10">
      <div className="headder flex justify-between mb-3 items-center">
        <h2 className="text-secondary text-3xl font-bold mb-5">{header}</h2>
        <button
          className="px-4 py-2 font-semibold bg-[#c2dfe3] w-[fit-content] rounded-lg text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out flex items-center"
          onClick={expandHandler}
        >
          Show All
          <FaCircleArrowRight className="text-xl ml-2" />
        </button>
      </div>
      <ShowOffers offers={data} />
    </div>
  );
}

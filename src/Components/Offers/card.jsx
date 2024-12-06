/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatPrice } from "../../Utils/functions.util";

export default function Card({
  id,
  header = "Card title",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,impedit?",
  ratio = 50,
  previousPrice = 2000,
  currentPrice = 1000,
  myClass = "",
}) {
  return (
    <div
      className={`block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:scale-95 transition-all duration-300 ${myClass} relative`}
    >
      <img className="rounded-t-lg" src="https://placehold.co/400x250" alt="" />
      <div className="discount-ratio">{ratio}% OFF</div>
      <div className="discount-value">{formatPrice(previousPrice)}</div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {header}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <Link
            className="px-4 py-2 font-semibold bg-[#c2dfe3] w-[fit-content] rounded-lg text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out flex items-center"
            to={"/MediPortal/offers"}
          >
            Book
          </Link>
          <span className="font-semibold">{formatPrice(currentPrice)}</span>
        </div>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/MediPortal/offers/${offer?.offerid}`);
  };

  return (
    <div
      className="flex flex-col gap-4 items-center md:items-start w-full hover:scale-95 transition-all duration-300 hover:cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="image rounded-lg h-[190px] w-full max-w-[400px] min-w-[280px] overflow-hidden relative">
        <img
          src={
            offer?.offerimg ||
            `https://res.cloudinary.com/djuhk9ozp/image/upload/v1733386736/${offer?.offerid}.webp`
          }
          alt={"offer"}
          className="rounded-lg object-cover w-full h-full"
        />
        <div className="discount absolute top-2 left-2 bg-darkRed font-semibold text-white px-2 py-1 rounded-md text-sm">
          {offer?.percentage}% OFF
        </div>
      </div>

      {/* Text Section */}
      <div className="text flex flex-col gap-2 items-center md:items-start">
        <h2 className="text-lg md:text-xl font-bold text-center md:text-left">
          {offer?.firstname}
        </h2>

        {/* Prices Section */}
        <div className="prices flex gap-2 text-[16px] md:text-[18px]">
          <span className="text-lightGrayText line-through">{500}</span>
          <span className="text-tertiary font-semibold">{200}</span>
        </div>

        {/* Number of Offers Section */}
        <div className="numberOfOffers flex gap-2 text-[14px] md:text-[16px] text-lightGrayText">
          <span>{150}</span>
          <span>Offers</span>
        </div>
      </div>
    </div>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.object.isRequired,
};

export default OfferCard;

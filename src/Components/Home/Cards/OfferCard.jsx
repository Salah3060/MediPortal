import PropTypes from "prop-types";

const OfferCard = ({ offer }) => {
  return (
    <div className="flex flex-col gap-4 items-center md:items-start w-full hover:scale-95 transition-all duration-300">
      {/* Image Section */}
      <div className="image rounded-lg h-[190px] w-full max-w-[400px] min-w-[280px] overflow-hidden relative">
        <img
          src={offer.image}
          alt={offer.title}
          className="rounded-lg object-cover w-full h-full"
        />
        <div className="discount absolute top-2 left-2 bg-darkRed font-semibold text-white px-2 py-1 rounded-md text-sm">
          {offer.discount}
        </div>
      </div>

      {/* Text Section */}
      <div className="text flex flex-col gap-2 items-center md:items-start">
        <h2 className="text-lg md:text-xl font-bold text-center md:text-left">
          {offer.title}
        </h2>

        {/* Prices Section */}
        <div className="prices flex gap-2 text-[16px] md:text-[18px]">
          <span className="text-lightGrayText line-through">
            {offer.oldPrice}
          </span>
          <span className="text-tertiary font-semibold">{offer.newPrice}</span>
        </div>

        {/* Number of Offers Section */}
        <div className="numberOfOffers flex gap-2 text-[14px] md:text-[16px] text-lightGrayText">
          <span>{offer.numberOfOffers}</span>
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

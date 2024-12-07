import propTypes from "prop-types";
import { renderStars, formatDate } from "@/Utils/functions.util";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between w-full px-4 py-4 border-b items-center gap-4">
      {/* Info Section */}
      <div className="info flex flex-col sm:flex-1 gap-2 text-center sm:text-left">
        <div className="stars flex justify-center sm:justify-start gap-1">
          {renderStars(review.rate)}
        </div>
        <span className="text-sm mt-1">Overall Rating</span>

        <p className="mt-2 text-lg text-primary/80">{`"${review.review}"`}</p>

        <span className="text-[12px] mt-2 text-secondary font-medium">
          {review?.patient?.firstName}
        </span>
        <span className="text-[12px] -mt-2 text-secondary">
          {formatDate(review.reviewDate)}
        </span>
      </div>

      {/* Rate Section */}
      <div className="rate flex flex-col items-center gap-2">
        <div className="bg-primary text-tertiary rounded-2xl flex justify-center items-center px-4 py-3 text-xl font-bold w-[fit-content]">
          {review.rate}
        </div>
        <span className="text-sm sm:text-base">Doctor Rating</span>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: propTypes.object.isRequired,
};

export default ReviewCard;

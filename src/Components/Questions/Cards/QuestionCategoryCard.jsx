import propTypes from "prop-types";
import { Link } from "react-router-dom";

const QuestionCategoryCard = ({ specialty }) => {
  return (
    <Link
      className="flex px-8 py-2 justify-between bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0] text-primary rounded-xl"
      to={`/MediPortal/questions/${specialty}`}
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-bold">{specialty}</h1>
        <p className="text-sm text-primary/60">
          Questions related to {specialty}
        </p>
      </div>
    </Link>
  );
};

QuestionCategoryCard.propTypes = {
  specialty: propTypes.string.isRequired,
};

export default QuestionCategoryCard;

import PropTypes from "prop-types";

const SpecialtyCard = ({ specialty }) => {
  return (
    <div className="flex flex-col gap-2 w-full rounded-lg">
      <div className="image rounded-t-lg overflow-hidden w-full h-[215px]">
        <img
          src={specialty.image}
          alt={specialty.title}
          className="rounded-t-lg object-cover w-full h-full"
        />
      </div>
      <div className="text w-full pb-3 text-left ps-4">
        <h2 className="text-lg font-semibold text-secondary truncate">
          {specialty.title}
        </h2>
      </div>
    </div>
  );
};

SpecialtyCard.propTypes = {
  specialty: PropTypes.object.isRequired,
};

export default SpecialtyCard;

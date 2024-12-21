import PropTypes from "prop-types";
import {
  setSelectedSpecialty,
  fetchDoctorsBySpecialty,
} from "@/Store/Slices/searchSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SpecialtyCard = ({ specialty }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setSelectedSpecialty(specialty.title));
    dispatch(fetchDoctorsBySpecialty({ specialty: specialty.title, page: 1 }));
    navigate("/MediPortal/search");
  };

  return (
    <div
      className="flex flex-col gap-4 items-center md:items-start w-full hover:scale-95 transition-all duration-300 bg-white max-w-[400px] border rounded-xl hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="image rounded-t-lg overflow-hidden w-full h-[215px] max-w-[400px] min-w-[280px]">
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

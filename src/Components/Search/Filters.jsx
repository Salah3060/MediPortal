import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { BsGenderAmbiguous, BsCashStack } from "react-icons/bs";
import { PiHospitalDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredDoctors } from "@/Store/Slices/searchSlice";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { motion } from "framer-motion";

const Filters = () => {
  const [isGenderFilterOpen, setIsGenderFilterOpen] = useState(true);
  const [isEntityFilterOpen, setIsEntityFilterOpen] = useState(true);
  const [isFeesFilterOpen, setIsFeesFilterOpen] = useState(true);

  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState([]);
  const [selectedFees, setSelectedFees] = useState("any");

  const dispatch = useDispatch();

  // Get the full, unfiltered doctors list from Redux
  const doctors = useSelector((state) => state.search.doctors); // Unfiltered doctors list

  // Local state for filtered doctors (optional, avoids Redux re-dispatch loops)
  const [filteredDoctors, setLocalFilteredDoctors] = useState([]);

  // Filter Doctors Logic
  useEffect(() => {
    const filteredDoctors = doctors.filter((doctor) => {
      const genderMatch =
        selectedGender.length === 0 || selectedGender.includes(doctor.gender);
      const entityMatch =
        selectedEntity.length === 0 || selectedEntity.includes(doctor.entity);
      const feesMatch =
        selectedFees === "any" ||
        (selectedFees === "300-" && doctor.fees > 300) || // Handle 'Above 300'
        (doctor.fees >= parseInt(selectedFees.split("to")[0] || 0) &&
          doctor.fees <= parseInt(selectedFees.split("to")[1] || Infinity));

      return genderMatch && entityMatch && feesMatch;
    });

    // Update local filtered doctors
    setLocalFilteredDoctors(filteredDoctors);

    // Optionally dispatch to Redux (if filtering must persist across components)
    dispatch(setFilteredDoctors(filteredDoctors));
  }, [selectedGender, selectedEntity, selectedFees, doctors, dispatch]);

  // Toggle Filters
  const toggleGenderFilter = () => setIsGenderFilterOpen(!isGenderFilterOpen);
  const toggleEntityFilter = () => setIsEntityFilterOpen(!isEntityFilterOpen);
  const toggleFeesFilter = () => setIsFeesFilterOpen(!isFeesFilterOpen);

  // Handle Filter Selection
  const handleGenderChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGender((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  };

  const handleEntityChange = (e) => {
    const { value, checked } = e.target;
    setSelectedEntity((prev) =>
      checked ? [...prev, value] : prev.filter((e) => e !== value)
    );
  };

  const handleFeesChange = (e) => {
    setSelectedFees(e.target.value);
  };

  return (
    <div className="w-full lg:w-[25%] rounded-xl bg-white h-[fit-content]">
      {/* Header */}
      <div className="header flex justify-start items-center w-full py-4 px-6 bg-primary text-tertiary rounded-t-xl">
        <FaFilter className="text-lg" />
        <h1 className="text-md font-semibold ml-2">Filters</h1>
      </div>

      {/* Filters */}
      <div className="filters flex flex-col gap-4 py-4 px-4 items-center rounded-b-xl">
        {/* Single Filter: Gender */}
        <div className="single w-full border-b pb-4">
          <div
            className="header flex justify-between items-center cursor-pointer"
            onClick={toggleGenderFilter}
          >
            <div className="flex items-center gap-2">
              <BsGenderAmbiguous className="text-lg text-darkRed" />
              <h1 className="text-md font-semibold text-primary">Gender</h1>
            </div>
            {isGenderFilterOpen ? (
              <IoIosArrowDropdownCircle className="text-lg text-darkRed" />
            ) : (
              <IoIosArrowDroprightCircle className="text-lg text-darkRed" />
            )}
          </div>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={
              isGenderFilterOpen
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="content mt-2 px-4 py-2 bg-lightGray rounded-lg flex flex-col gap-2">
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  value="Male"
                  onChange={handleGenderChange}
                />{" "}
                Male
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  value="Female"
                  onChange={handleGenderChange}
                />{" "}
                Female
              </label>
            </div>
          </motion.div>
        </div>

        {/* Single Filter: Entity */}
        <div className="single w-full border-b pb-4">
          <div
            className="header flex justify-between items-center cursor-pointer"
            onClick={toggleEntityFilter}
          >
            <div className="flex items-center gap-2">
              <PiHospitalDuotone className="text-lg text-darkRed" />
              <h1 className="text-md font-semibold text-primary">Entity</h1>
            </div>
            {isEntityFilterOpen ? (
              <IoIosArrowDropdownCircle className="text-lg text-darkRed" />
            ) : (
              <IoIosArrowDroprightCircle className="text-lg text-darkRed" />
            )}
          </div>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={
              isEntityFilterOpen
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="content mt-2 px-4 py-2 bg-lightGray rounded-lg flex flex-col gap-2">
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  value="Clinic"
                  onChange={handleEntityChange}
                />{" "}
                Clinic
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  value="Hospital"
                  onChange={handleEntityChange}
                />{" "}
                Hospital
              </label>
            </div>
          </motion.div>
        </div>

        {/* Single Filter: Fees */}
        <div className="single w-full">
          <div
            className="header flex justify-between items-center cursor-pointer"
            onClick={toggleFeesFilter}
          >
            <div className="flex items-center gap-2">
              <BsCashStack className="text-lg text-darkRed" />
              <h1 className="text-md font-semibold text-primary">Fees</h1>
            </div>
            {isFeesFilterOpen ? (
              <IoIosArrowDropdownCircle className="text-lg text-darkRed" />
            ) : (
              <IoIosArrowDroprightCircle className="text-lg text-darkRed" />
            )}
          </div>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={
              isFeesFilterOpen
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="content mt-2 px-4 py-2 bg-lightGray rounded-lg flex flex-col gap-2">
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="any"
                  defaultChecked
                  className="mr-2"
                  onChange={handleFeesChange}
                />
                Any
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="50-100"
                  className="mr-2"
                  onChange={handleFeesChange}
                />
                From 50 to 100
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="100-200"
                  className="mr-2"
                  onChange={handleFeesChange}
                />
                From 100 to 200
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="200-300"
                  className="mr-2"
                  onChange={handleFeesChange}
                />
                From 200 to 300
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="300-"
                  className="mr-2"
                  onChange={handleFeesChange}
                />
                Above 300
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Filters;

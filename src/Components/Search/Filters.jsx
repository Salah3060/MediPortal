import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { PiHospitalDuotone } from "react-icons/pi";
import { BsCashStack } from "react-icons/bs";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { motion } from "framer-motion";

const Filters = () => {
  const [isGenderFilterOpen, setIsGenderFilterOpen] = useState(true);
  const [isEntityFilterOpen, setIsEntityFilterOpen] = useState(true);
  const [isFeesFilterOpen, setIsFeesFilterOpen] = useState(true);

  const toggleGenderFilter = () => setIsGenderFilterOpen(!isGenderFilterOpen);
  const toggleEntityFilter = () => setIsEntityFilterOpen(!isEntityFilterOpen);
  const toggleFeesFilter = () => setIsFeesFilterOpen(!isFeesFilterOpen);

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
                <input type="checkbox" className="mr-2" /> Male
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Female
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
                <input type="checkbox" className="mr-2" /> Clinic
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Hospital
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
                />
                Any
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="50-100"
                  className="mr-2"
                />
                From 50 to 100
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="100-200"
                  className="mr-2"
                />
                From 100 to 200
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="200-300"
                  className="mr-2"
                />
                From 200 to 300
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fees"
                  value="above-300"
                  className="mr-2"
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

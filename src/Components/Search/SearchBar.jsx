import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilteredDoctors,
  fetchDoctorsBySpecialty,
  fetchAllDoctors,
  setSelectedSpecialty,
} from "@/Store/Slices/searchSlice";
import { IoIosSearch } from "react-icons/io";

// DropdownMenu Component
const DropdownMenu = ({ title, data, isOpen, onToggle, onSelect }) => {
  return (
    <div className="relative inline-block text-left w-[800px] h-[100%]">
      {/* Button to open/close dropdown */}
      <button
        onClick={onToggle}
        className="inline-flex justify-center items-center gap-2 w-full px-4 py-2 text-sm hover:bg-primary hover:text-tertiary h-[100%] transition-all duration-300 rounded-md"
      >
        {title}
        <FaAngleDown
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1">
            {data.map((section, index) => (
              <div key={index}>
                {/* Section title */}
                <div className="px-4 text-sm text-gray-500 font-semibold">
                  {section.title}
                </div>
                {/* Section items */}
                <ul>
                  {section.items.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => onSelect(item)} // Call onSelect with the selected value
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {index < data.length - 1 && <hr className="my-2" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired, // Add this prop type
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Parent SearchBar Component
const SearchBar = () => {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [query, setQuery] = useState("");
  const { doctors, specialties, page, insurances } = useSelector(
    (state) => state.search
  );
  const [selectedInsurance, setSelectedInsurance] = useState("All Insurances");
  const [selectedSpecialty, setSelectedSpecialtyy] =
    useState("All Specialties");

  const handleToggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleSearchClick = () => {
    dispatch(setSelectedSpecialty(selectedSpecialty)); // Update the selected specialty

    let filteredDoctors = doctors;

    // Filter by specialty if a specific specialty is selected
    if (selectedSpecialty !== "All Specialties") {
      dispatch(fetchDoctorsBySpecialty({ specialty: selectedSpecialty, page }));
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.specialization === selectedSpecialty
      );
    } else {
      dispatch(fetchAllDoctors(page));
    }

    // Filter by insurance if a specific insurance is selected
    if (selectedInsurance !== "All Insurances") {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.insurances.some(
          (insurance) => insurance.insuranceName === selectedInsurance
        )
      );
    } else {
      // Null
    }

    // Dispatch the filtered doctors to update the state
    dispatch(setFilteredDoctors(filteredDoctors));
  };

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      const queryParts = debouncedQuery.trim().split(" ");

      let filtered;

      if (queryParts.length > 1) {
        filtered = doctors.filter(
          (doctor) =>
            doctor.firstname
              .toLowerCase()
              .startsWith(queryParts[0].toLowerCase()) &&
            doctor.lastname
              .toLowerCase()
              .startsWith(queryParts[1].toLowerCase())
        );
      } else {
        filtered = doctors.filter(
          (doctor) =>
            doctor.firstname
              .toLowerCase()
              .startsWith(debouncedQuery.toLowerCase()) ||
            doctor.lastname
              .toLowerCase()
              .startsWith(debouncedQuery.toLowerCase())
        );
      }

      dispatch(setFilteredDoctors(filtered));
    } else {
      dispatch(setFilteredDoctors(doctors));
    }
  }, [debouncedQuery, doctors, dispatch]);

  const specialtiesData = [
    {
      title: "Most Popular",
      items: specialties,
    },
  ];

  const insuranceData = [
    {
      title: "Available Insurances",
      items: insurances,
    },
  ];

  return (
    <div className="flex items-center rounded-md h-12 border shadow-md">
      {/* Specialty Dropdown */}
      <DropdownMenu
        title={selectedSpecialty || "Select a Specialty"}
        data={specialtiesData}
        isOpen={openDropdown === "specialty"}
        onToggle={() => handleToggleDropdown("specialty")}
        onSelect={(item) => {
          setSelectedSpecialtyy(item); // Update selected specialty
          setOpenDropdown(null); // Close the dropdown
        }}
      />
      {/* Insurance Dropdown */}
      {/* <DropdownMenu
        title={selectedInsurance || "My Insurance is"}
        data={insuranceData}
        isOpen={openDropdown === "insurance"}
        onToggle={() => handleToggleDropdown("insurance")}
        onSelect={(item) => {
          setSelectedInsurance(item); // Update selected insurance
          setOpenDropdown(null); // Close the dropdown
        }}
      /> */}

      {/* Search by Name Input */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="or Search by Name"
          className="w-full px-4 py-2 text-sm rounded-md outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button
        className="px-6 py-2 text-white bg-darkRed rounded-md hover:bg-darkRed/80 flex items-center h-full"
        onClick={handleSearchClick}
      >
        <span className="mr-2">
          <IoIosSearch className="text-2xl" />
        </span>{" "}
        Search
      </button>
    </div>
  );
};

export default SearchBar;

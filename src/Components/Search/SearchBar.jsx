import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredDoctors } from "@/Store/Slices/searchSlice";

// DropdownMenu Component
const DropdownMenu = ({ title, data, isOpen, onToggle }) => {
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
  const { doctors } = useSelector((state) => state.search);

  const handleToggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log(debouncedQuery);
      const filtered = doctors.filter((doctor) =>
        doctor.firstname.toLowerCase().startsWith(debouncedQuery.toLowerCase())
      );
      console.log(filtered);
      dispatch(setFilteredDoctors(filtered));
    } else {
      dispatch(setFilteredDoctors(doctors));
    }
  }, [debouncedQuery, doctors, dispatch]);

  const specialtiesData = [
    {
      title: "Most Popular",
      items: [
        "Dermatology (Skin)",
        "Dentistry (Teeth)",
        "Psychiatry",
        "Pediatrics",
      ],
    },
    {
      title: "Other Specialties",
      items: [
        "Allergy and Immunology",
        "Audiology",
        "Cardiology",
        "Endocrinology",
      ],
    },
  ];

  const citiesData = [
    {
      title: "Major Cities",
      items: ["New York", "Los Angeles", "Chicago", "Houston"],
    },
    {
      title: "Other Cities",
      items: ["Austin", "Miami", "San Francisco", "Seattle"],
    },
  ];

  const insuranceData = [
    {
      title: "Insurance Providers",
      items: ["Aetna", "Blue Cross", "Cigna", "United Healthcare"],
    },
  ];

  return (
    <div className="flex items-center rounded-md h-12 border shadow-md">
      {/* Dropdowns */}
      <DropdownMenu
        title="Select a Specialty"
        data={specialtiesData}
        isOpen={openDropdown === "specialty"}
        onToggle={() => handleToggleDropdown("specialty")}
      />
      <DropdownMenu
        title="In this City"
        data={citiesData}
        isOpen={openDropdown === "city"}
        onToggle={() => handleToggleDropdown("city")}
      />
      <DropdownMenu
        title="My Insurance is"
        data={insuranceData}
        isOpen={openDropdown === "insurance"}
        onToggle={() => handleToggleDropdown("insurance")}
      />

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
      <button className="px-6 py-2 text-white bg-darkRed rounded-md hover:bg-darkRed/80 flex items-center h-full ">
        <span className="mr-2">🔍</span> Search
      </button>
    </div>
  );
};

export default SearchBar;

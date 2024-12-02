import PropTypes from "prop-types";
import { useState } from "react";

const DropdownMenu = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to open/close dropdown */}
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w- px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {title}
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
};

export default DropdownMenu;

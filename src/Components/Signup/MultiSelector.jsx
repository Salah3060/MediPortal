/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const diseases = [
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  { label: "Heart Disease", value: "heart-disease" },
  { label: "Asthma", value: "asthma" },
  { label: "Arthritis", value: "arthritis" },
  { label: "Cancer", value: "cancer" },
  { label: "Kidney Disease", value: "kidney-disease" },
];

const Multiselector = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  //   const handleCheckboxChange = (value) => {
  //     setSelected((prevSelected) =>
  //       prevSelected.includes(value)
  //         ? prevSelected.filter((item) => item !== value)
  //         : [...prevSelected, value]
  //     );
  //   };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown relative w-96 justify-self-center">
      {/* Dropdown Toggle */}
      <div
        onClick={toggleDropdown}
        className="p-3 border rounded bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200"
      >
        {selected.length > 0
          ? `Selected: ${selected.join(", ")}`
          : "Select Chronic Diseases"}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded shadow-md max-h-60 overflow-y-auto z-10">
          {diseases.map((disease) => (
            <label
              key={disease.value}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                value={disease.value}
                checked={selected.includes(disease.value)}
                onChange={() => setSelected(disease.value)}
                className="mr-2"
              />
              {disease.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Multiselector;

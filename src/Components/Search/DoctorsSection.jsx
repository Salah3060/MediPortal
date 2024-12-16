import { useState } from "react";
import DoctorCard from "./Cards/DoctorCard";
import { useSelector } from "react-redux";
import Loader from "@/Components/Loader";

const DoctorsSection = () => {
  const { filteredDoctors, loading, error, selectedSpecialty } = useSelector(
    (state) => state.search
  );

  const [sortOption, setSortOption] = useState("default");
  return (
    <div className="flex flex-col gap-6 pb-4 w-full md:px-4 lg:px-8">
      {/* Header Section */}
      <div className="header flex justify-between items-end w-full gap-4">
        <div className="text flex flex-col lg:flex-ro items-start lg:items-baseline gap-2 text-primary">
          <h1 className="text-lg lg:text-2xl font-bold">{selectedSpecialty}</h1>
          <span className="text-sm lg:text-base text-primary/80">
            {filteredDoctors?.length}
          </span>
        </div>
        {/* <div className="sorting flex gap-4 items-center w-[fit-content] lg:w-auto text-primary">
          <label htmlFor="sort" className="text-sm font-bold">
            Sort By:
          </label>
          <select
            name="sort"
            id="sort"
            className="py-2 px-4 bg-primary text-tertiary outline-none rounded-xl"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default Sorting</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="nameAtoZ">Name: A to Z</option>
            <option value="nameZtoA">Name: Z to A</option>
          </select>
        </div> */}
      </div>

      {/* Doctors Section */}
      <div className="doctors w-full">
        {loading ? (
          <div className="loading flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <div className="error text-center text-primary text-xl font-bold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredDoctors?.map((doctor) => (
              <DoctorCard key={doctor.userid} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsSection;

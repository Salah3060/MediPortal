import { useState } from "react";
import DoctorCard from "./Cards/DoctorCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllDoctors,
  fetchDoctorsBySpecialty,
} from "@/Store/Slices/searchSlice";

const DoctorsSection = () => {
  const dispatch = useDispatch();

  const { filteredDoctors, loading, error } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  const [sortOption, setSortOption] = useState("default");
  return (
    <div className="flex flex-col gap-4 py-2 w-full">
      <div className="header flex justify-between items-center w-full">
        <div className="text flex items-baseline gap-2 text-primary">
          <h1 className="text-xl font-bold">
            All Specialties
            {/* Change later to select Spec */}
          </h1>
          <span className="text-sm text-primary/80">
            1500 Doctor
            {/* Change later to number of doctors */}
          </span>
        </div>
        <div className="sorting mt-4 lg:mt-0 flex gap-4 items-center w-full lg:w-auto text-primary">
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
        </div>
      </div>

      <div className="doctors"></div>
    </div>
  );
};

export default DoctorsSection;

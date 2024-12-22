import SearchHeader from "@/Components/Search/SearchHeader";
import Result from "@/Components/Search/Result";
import { useDispatch } from "react-redux";
import { fetchAllDoctors } from "@/Store/Slices/searchSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setSpecialties } from "@/Store/Slices/searchSlice";
import { getAllSpecialties } from "@/API/DoctorsApi";
import { scrollToTop } from "@/Utils/functions.util";

const Search = () => {
  const dispatch = useDispatch();
  const { selectedSpecialty } = useSelector((state) => state.search);
  const { page } = useSelector((state) => state.search);

  useEffect(() => {
    if (selectedSpecialty === "All Specialties") {
      dispatch(fetchAllDoctors(page));
    }
  }, [dispatch, page, selectedSpecialty]);

  // fetch specs when the componenrt mounts
  const fetchData = async () => {
    try {
      const specialtiesData = await getAllSpecialties();
      // Extract specializations and add "All Specialties"
      const specialtiesArray = [
        "All Specialties",
        ...specialtiesData.map((spec) => spec.specialization),
      ];

      // Dispatch the updated array
      dispatch(setSpecialties(specialtiesArray));
    } catch (error) {
      console.log("Error fetching specialties: ", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = `Doctors | ${selectedSpecialty}`;
    scrollToTop();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <SearchHeader />
      <div className="bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0]">
        <Result />
      </div>
    </div>
  );
};

export default Search;

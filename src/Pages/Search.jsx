import SearchHeader from "@/Components/Search/SearchHeader";
import Result from "@/Components/Search/Result";
import { useDispatch } from "react-redux";
import { fetchAllDoctors } from "@/Store/Slices/searchSlice";
import { useEffect } from "react";

const Search = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);
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

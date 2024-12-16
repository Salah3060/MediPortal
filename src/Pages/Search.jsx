import SearchHeader from "@/Components/Search/SearchHeader";
import Result from "@/Components/Search/Result";
import { useDispatch } from "react-redux";
import { fetchAllDoctors } from "@/Store/Slices/searchSlice";
import { useEffect, useState } from "react";


const Search = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllDoctors(page));
  }, [dispatch, page]);
  return (
    <div className="flex flex-col gap-5">
      <SearchHeader />
      <div className="bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0]">
        <Result setPage={setPage} />
      </div>
    </div>
  );
};

export default Search;

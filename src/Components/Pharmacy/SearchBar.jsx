import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  setFilteredItems,
} from "@/Store/Slices/productsSlice";
import SearchCard from "./Cards/SearchCard";
import Loader from "../Loader";

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

const SearchBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { isLoading, items, filteredItems } = useSelector(
    (state) => state.products
  );

  // Fetch all products once
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Debounced query handling
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      const filtered = items.filter((item) =>
        item.productname.toLowerCase().startsWith(debouncedQuery.toLowerCase())
      );
      dispatch(setFilteredItems(filtered));
    } else {
      dispatch(setFilteredItems([]));
    }
  }, [debouncedQuery, items, dispatch]);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSearchActive(false);
    }
  };

  return (
    <div className="relative" onBlur={handleBlur} tabIndex={-1}>
      <div className="container max-w-[1300px] mx-auto flex justify-between items-center px-4 py-8 flex-col relative">
        <div className="Landing flex flex-col gap-9 w-full">
          <div className="text text-left">
            <h1 className="md:text-3xl text-xl font-bold text-primary">
              Get your medicine with delivery to your location
            </h1>
          </div>
          <div
            className={`searchBar flex items-center gap-4 text-xl border px-4 rounded-2xl shadow-slate-600 transition-all duration-300 ${
              searchActive ? "border-[#253237]" : "border-[#c2dfe3]"
            }`}
          >
            <AiOutlineSearch className="text-2xl hover:text-tertiary transition-all duration-300" />
            <input
              type="text"
              name="searchProduct"
              id="searchProduct"
              placeholder="Search for your order"
              className="w-[85%] p-3 outline-none"
              onFocus={() => setSearchActive(true)}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results Dropdown */}
        {searchActive && filteredItems.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 bg-white shadow-lg mt-2 rounded-lg z-10 grid grid-cols-2 overflow-y-scroll max-h-[400px]"
            tabIndex={-1}
          >
            {filteredItems.map((item) => (
              <SearchCard key={item.productid} product={item} />
            ))}
          </div>
        )}
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default SearchBar;

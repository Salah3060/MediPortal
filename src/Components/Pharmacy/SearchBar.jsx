import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SearchBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <div>
      <div className="container max-w-[1300px] mx-auto flex justify-between items-center px-4 py-8 flex-col">
        <div className="Landing flex flex-col gap-9 w-full">
          <div className="text text-left">
            <h1 className="text-3xl font-bold text-primary">
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
              onBlur={() => setSearchActive(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

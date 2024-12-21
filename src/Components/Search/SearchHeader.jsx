import SearchBar from "./SearchBar";
import { IoCall } from "react-icons/io5";

const SearchHeader = () => {
  return (
    <div className="w-full">
      <div className="container max-w-[1300px] mx-auto px-4 py-4 flex flex-col gap-6 lg:gap-8">
        {/* Text Section */}
        <div className="text flex flex-col gap-4 text-[14px] md:text-[15px] text-primary">
          {/* Header Title */}
          <h1 className="font-bold text-lg md:text-xl text-center lg:text-left">
            Best Doctors In Egypt
          </h1>

          {/* Call Section */}
          <p className="font-medium text-primary/60 flex items-center justify-center lg:justify-start gap-2 lg:gap-4">
            Book online or call{" "}
            <span className="font-bold text-black flex items-center gap-2">
              <IoCall size={18} />
              16676
            </span>
          </p>

          {/* Statistics */}
          <p className="font-medium text-primary/60 text-center lg:text-left">
            15,000 Doctors - 9,000 Professors and Consultants - More than 40
            Specialties
          </p>
        </div>

        {/* Search Section */}
        <div className="search hidden md:block">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;

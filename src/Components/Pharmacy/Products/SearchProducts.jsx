import { AiOutlineSearch } from "react-icons/ai";

const SearchProducts = () => {
  return (
    <div className="container max-w-[1300px] mx-auto flex px-4 pb-5 pt-2">
      <div className="flex items-center gap-4 bg-white px-4 rounded-xl w-full">
        <AiOutlineSearch className="text-2xl hover:text-tertiary transition-all duration-300" />
        <input
          type="text"
          name="searchProduct"
          id="searchProduct"
          placeholder="Search for your order"
          className="w-[90%] p-3 outline-none"
        />
      </div>
    </div>
  );
};

export default SearchProducts;

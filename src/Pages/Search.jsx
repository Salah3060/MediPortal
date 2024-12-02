import SearchHeader from "@/Components/Search/SearchHeader";
import Result from "@/Components/Search/Result";

const Search = () => {
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

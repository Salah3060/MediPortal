import SearchBar from "@/Components/Pharmacy/SearchBar";
import Info from "@/Components/Pharmacy/Info";
import Categories from "@/Components/Pharmacy/Categories";
import { useEffect } from "react";
import { scrollToTop } from "@/Utils/functions.util";

const Pharmacy = () => {
  useEffect(() => {
    document.title = "MediPortal | Pharmacy";
    scrollToTop();
  }, []);

  return (
    <div className="w-full">
      <div className="pb-1 border-b border-[1px]">
        <SearchBar />
      </div>
      <div className="border-b">
        <Info />
      </div>
      <div className="bg-[#9db4c0]">
        <Categories />
      </div>
    </div>
  );
};

export default Pharmacy;

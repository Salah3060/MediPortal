import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import Filters from "./Filters";
import DoctorsSection from "./DoctorsSection";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { setPage } from "@/Store/Slices/searchSlice";
import { useDispatch } from "react-redux";

const Result = () => {
  const dispatch = useDispatch();

  return (
    <div className="container max-w-[1300px] mx-auto px-4 py-2 flex flex-col">
      {/* Header */}
      <div className="w-full py-2 Header text-[12px]">
        <div className="container max-w-screen-2xl mx-auto">
          <p className="flex gap-2">
            <Link
              className="flex gap-2 items-center text-secondary"
              to={"/MediPortal/"}
            >
              <GoHome className="text-lg" />
              <span>MediPort</span>
            </Link>
            <span>/</span>
            <span className="text-primary capitalize font-semibold">
              All Doctors
            </span>
          </p>
        </div>
      </div>

      {/* Result Page */}
      <div className="py-[12px]">
        <div className="container max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-[24px]">
          {/* Filters */}
          <Filters />
          {/* Products List */}
          <DoctorsSection />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center py-4 w-full">
        <Stack spacing={2} className="w-full">
          <Pagination
            count={5}
            variant="outlined"
            shape="rounded"
            onChange={(e, value) => {
              dispatch(setPage(value));
            }}
            sx={{
              "& .MuiPagination-ul": {
                width: "100%",
                display: "flex",
                justifyContent: "space-between", // Spread across the full width
              },
              "& .MuiPaginationItem-root": {
                fontSize: "1.2rem", // Larger font size
                minWidth: "3rem", // Increase button size
                minHeight: "3rem", // Increase button size
                borderRadius: "8px", // Rounded corners
              },
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Result;

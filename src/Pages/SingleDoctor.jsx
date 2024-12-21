import SearchHeader from "@/Components/Search/SearchHeader";
import DoctorInfo from "@/Components/Search/DoctorInfo";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDoctorById } from "@/Store/Slices/searchSlice";
import { scrollToTop } from "../Utils/functions.util";

const SingleDoctor = () => {
  const { doctorId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    dispatch(fetchDoctorById(doctorId));
  }, [dispatch, doctorId]);

  return (
    <div className="flex flex-col">
      <SearchHeader />

      <div className="bg-gradient-to-r from-[#c2dfe3] to-[#9db4c0]">
        <DoctorInfo id={doctorId} />
      </div>
    </div>
  );
};

export default SingleDoctor;

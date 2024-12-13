import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { fetchDoctorById } from "@/Store/Slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext, useMode } from "../Components/DoctorDashboard/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../Components/DoctorDashboard/Topbar";

import Sidebar from "../Components/DoctorDashboard/Sidebar";
import Loader from "../Components/Loader";

export default function DoctorDashboard() {
  // Using useSearchParams (preferred in React Router v6+)
  const [theme, colorMode] = useMode();
  const { doctorid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDoctorById(doctorid));
  }, [dispatch, doctorid]);
  const { selectedDoctor: doctor, loading } = useSelector(
    (state) => state.search
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="flex relative min-h-lvh">
              <Sidebar name={doctor?.firstname} spec={doctor?.specialization} />
              <main className="w-full h-full">
                <Topbar />
                <Outlet />
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </>
  );
}

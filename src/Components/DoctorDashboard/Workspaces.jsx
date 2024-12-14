import Header from "./header";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAvailibility,
  fetchAllhospitals,
  resetUpdateState,
} from "../../Store/Slices/WorkspaceSlice";
import Availability from "./hospitalAvailibility";
import CAvailibility from "./clinicAvailibility";
import { toast } from "react-toastify";
import Loader from "../Loader";
export default function Workspaces() {
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const [place, setPlace] = useState("");
  const {
    Allhospitals: hospitals,
    errorUpdate,
    loading,
    updated,
  } = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();
  const [hospitalAvs, setHospitalAv] = useState(1);
  const [clinicAvs, setClinicAv] = useState(1);
  const handleFormSubmit = async (values) => {
    const data = Array.from({ length: hospitalAvs }).map((_, i) => ({
      workingDay: values.hospitalday[i],
      startTime: values.hospitalstart[i],
      endTime: values.hospitalend[i],
      locationId: values.hospitalLocation[i],
    }));
    const hospitalId = +values.hospitalId;
    console.log(data, hospitalId);
    dispatch(addAvailibility({ data, id: hospitalId }));
  };
  useEffect(() => {
    if (errorUpdate) {
      toast.error("An error happened, please try again!");
      return;
    }
    if (updated) {
      toast.success("Completed Successfully");
      dispatch(resetUpdateState());
      setPlace("");
    }
  }, [dispatch, errorUpdate, updated]);

  useEffect(() => {
    dispatch(fetchAllhospitals());
  }, [dispatch]);
  return (
    <Box m="20px">
      <Header title="Workspaces" subtitle="Manage your workspaces" />
      {loading ? (
        <Loader />
      ) : (
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({ values, handleBlur, handleChange }) => (
            <form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Button
                  variant="contained"
                  color={place === "clinic" ? `warning` : "secondary"}
                  sx={{ gridColumn: "span 2", height: "50px" }}
                  onClick={() => {
                    place === "clinic" ? setPlace("") : setPlace("clinic");
                  }}
                >
                  Clinic
                </Button>
                <Button
                  variant="contained"
                  color={place === "hospital" ? `warning` : "secondary"}
                  sx={{ gridColumn: "span 2", height: "50px" }}
                  onClick={() => {
                    place === "hospital" ? setPlace("") : setPlace("hospital");
                  }}
                >
                  Hospital
                </Button>
                {place === "clinic" && (
                  <>
                    {Array.from({ length: clinicAvs }).map((_, i) => (
                      <CAvailibility
                        key={i}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        values={values}
                        index={i}
                      />
                    ))}
                    <Button
                      onClick={() => setClinicAv((e) => e + 1)}
                      color="secondary"
                      variant="contained"
                      className={isNonMobile ? "col-span-1" : "col-span-4"}
                    >
                      Add another Clinic
                    </Button>
                  </>
                )}
                {place === "hospital" && (
                  <>
                    {Array.from({ length: hospitalAvs }).map((_, i) => (
                      <Availability
                        index={i}
                        key={i}
                        hospitals={hospitals}
                        cols={isNonMobile ? 2 : 4}
                        values={values}
                      />
                    ))}

                    <Button
                      onClick={() => {
                        if (
                          values.hospitalLocation.length === hospitalAvs &&
                          values.hospitalLocation.length === hospitalAvs &&
                          values.hospitalday.length === hospitalAvs &&
                          values.hospitalstart.length === hospitalAvs &&
                          values.hospitalend.length === hospitalAvs
                        )
                          setHospitalAv((e) => e + 1);
                        else {
                          toast.error("You have to fulfill all the fields!");
                        }
                      }}
                      color="secondary"
                      variant="contained"
                      className={isNonMobile ? "col-span-1" : "col-span-4"}
                    >
                      Add another hopital
                    </Button>
                  </>
                )}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" fullWidth>
                {place !== "" && (
                  <Button
                    onClick={() => handleFormSubmit(values)}
                    color="secondary"
                    variant="contained"
                  >
                    Create New User
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
}

const initialValues = {
  WorkspaceName: [],
  workspacePhone: [],
  workspaceLocation: [],
  hospitalName: [],
  hospitalday: [],
  hospitalstart: [],
  hospitalend: [],
  hospitalLocation: [],
  hospitalId: "",
};

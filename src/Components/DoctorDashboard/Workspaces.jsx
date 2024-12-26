import Header from "./HeaderTypo";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAvailibility,
  createClinic,
  fetchAllhospitals,
  resetErrorState,
  resetUpdateState,
} from "../../Store/Slices/WorkspaceSlice";
import Availability from "./hospitalAvailibility";
import CAvailibility from "./clinicAvailibility";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { fetchDoctorById } from "../../Store/Slices/searchSlice";
import { useParams } from "react-router-dom";
export default function Workspaces() {
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const [place, setPlace] = useState("");
  const {
    Allhospitals: hospitals,
    error,
    loading,
    updated,
    newClinic,
  } = useSelector((state) => state.workspaces);
  const { doctorid } = useParams();
  const dispatch = useDispatch();
  const [hospitalAvs, setHospitalAv] = useState(1);
  const [clinicAvs, setClinicAv] = useState(1);
  const [gvalues, setValues] = useState(null);
  useEffect(() => {
    if (!newClinic || !gvalues) return;
    toast.success("Your clinic is created successfully!");
    const data = Array.from({ length: clinicAvs }).map((_, i) => ({
      workingDay: gvalues?.clinicday[i],
      startTime: gvalues?.clinicstart[i],
      endTime: gvalues?.clinicend[i],
      locationId: newClinic?.locationid,
    }));
    dispatch(addAvailibility({ data, id: newClinic.workspaceid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newClinic]);
  const handleFormSubmit = async (values) => {
    setValues(values);
    if (place === "clinic") {
      const clinicData = {
        workspaceName: values.clinicname,
        workspaceType: "clinic",
        workspacePhone: values.clinicphone,
        workspaceLocation: values.clinicaddress,
      };
      dispatch(createClinic(clinicData));
    } else if (place === "hospital") {
      const data = Array.from({ length: hospitalAvs }).map((_, i) => ({
        workingDay: values.hospitalday[i],
        startTime: values.hospitalstart[i],
        endTime: values.hospitalend[i],
        locationId: values.hospitalLocation[i],
      }));
      const hospitalId = +values.hospitalId;
      dispatch(addAvailibility({ data, id: hospitalId }));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error("An error happened, please try again!");
      dispatch(resetErrorState());
      return;
    }
    if (updated) {
      toast.success("Completed Successfully");
      dispatch(resetUpdateState());
      dispatch(fetchDoctorById(doctorid));
      setPlace("");
    }
  }, [dispatch, doctorid, error, updated]);

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
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Clinic Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.clinicname}
                      name={`clinicname`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Clinic phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.clinicphone}
                      name={`clinicphone`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Clinic Location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.clinicaddress}
                      name={`clinicaddress`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    {Array.from({ length: clinicAvs }).map((_, i) => {
                      return (
                        <CAvailibility
                          cols={isNonMobile ? 2 : 4}
                          index={i}
                          key={i}
                        />
                      );
                    })}

                    <Button
                      onClick={() => {
                        if (
                          values.clinicday.length === clinicAvs &&
                          values.clinicstart.length === clinicAvs &&
                          values.clinicend.length === clinicAvs
                        ) {
                          setClinicAv((e) => e + 1);
                          return;
                        }
                        toast.error("All fields must be fulfilled");
                      }}
                      color="secondary"
                      variant="contained"
                      className={isNonMobile ? "col-span-1" : "col-span-4"}
                    >
                      Add another Availibility
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
                    Create
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
  clinicname: "",
  clinicaddress: "",
  clinicphone: "",
  clinicday: [],
  clinicstart: [],
  clinicend: [],
  hospitalName: [],
  hospitalday: [],
  hospitalstart: [],
  hospitalend: [],
  hospitalLocation: [],
  hospitalId: "",
};

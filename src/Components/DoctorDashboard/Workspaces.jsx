import Header from "./header";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllhospitals } from "../../Store/Slices/WorkspaceSlice";
import Availability from "./hospitalAvailibility";
import CAvailibility from "./clinicAvailibility";
export default function Workspaces() {
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const [place, setPlace] = useState("");
  const { Allhospitals: hospitals } = useSelector((state) => state.workspaces);
  const [hospitalAvs, setHospitalAv] = useState(1);
  const [clinicAvs, setClinicAv] = useState(1);
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllhospitals());
  }, [dispatch]);
  return (
    <Box m="20px">
      <Header title="Workspaces" subtitle="Manage your workspaces" />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ values, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
                    />
                  ))}

                  <Button
                    onClick={() => setHospitalAv((e) => e + 1)}
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
};

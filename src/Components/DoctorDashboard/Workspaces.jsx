import Header from "./header";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllhospitals } from "../../Store/Slices/WorkspaceSlice";
export default function Workspaces() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [place, setPlace] = useState("");
  const { Allhospitals: hospitals } = useSelector((state) => state.workspaces);
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

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Clinic Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.WorkspaceName}
                    name="WorkspaceName"
                    error={!!touched.WorkspaceName && !!errors.WorkspaceName}
                    helperText={touched.WorkspaceName && errors.WorkspaceName}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Clinic phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.workspacePhone}
                    name="workspacePhone"
                    error={!!touched.workspacePhone && !!errors.workspacePhone}
                    helperText={touched.workspacePhone && errors.workspacePhone}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Clinic Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.workspaceLocation}
                    name="workspaceLocation"
                    error={
                      !!touched.workspaceLocation && !!errors.workspaceLocation
                    }
                    helperText={
                      touched.workspaceLocation && errors.workspaceLocation
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}
              {place === "hospital" && (
                <>
                  <div>
                    <input
                      list="combo-box-options"
                      placeholder="Choose or type..."
                    />
                    <datalist id="combo-box-options">
                      {hospitals.map((option, index) => (
                        <option key={index} value={option?.workspacename} />
                      ))}
                    </datalist>
                  </div>
                </>
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {place !== "" && (
                <Button type="submit" color="secondary" variant="contained">
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  WorkspaceName: yup.string().required("required"),
  workspacePhone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  workspaceLocation: yup.string().required("required"),
});
const initialValues = {
  WorkspaceName: "",
  workspacePhone: "",
  workspaceLocation: "",
};

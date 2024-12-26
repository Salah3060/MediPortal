import Header from "./HeaderTypo";
import { Box, Button, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Loader from "../Loader";

import { useParams } from "react-router-dom";
import { resetError } from "../../Store/Slices/offersSlice";
import { fetchDoctorById } from "../../Store/Slices/searchSlice";
import { resetUpdate, updateDoctor } from "../../Store/Slices/userSlice";

export default function UpdateMyInfo() {
  const isNonMobile = useMediaQuery("(min-width:700px)");

  const {
    loading: loading2,
    error: error2,
    update,
  } = useSelector((state) => state.user);
  const { selectedDoctor, loading, error } = useSelector(
    (state) => state.search
  );
  const { doctorid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error || error2) {
      toast.error("Something went wrong, please try again!");
      dispatch(resetError());
    }
  }, [dispatch, error, error2]);
  useEffect(() => {
    if (update) {
      dispatch(fetchDoctorById(doctorid));
      dispatch(resetUpdate());
      toast.success("Successfully updated!");
    }
  }, [dispatch, doctorid, update]);
  useEffect(() => {
    if (!selectedDoctor) dispatch(fetchDoctorById(doctorid));
  }, [dispatch, doctorid, selectedDoctor]);
  const handleFormSubmit = async (values) => {
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      gender: values.gender,
      specialization: values.specialization,
      yearsofexperience: values.yearsofexperience.toString(),
      fees: values.fees.toString(),
      about: values.about,
      birthdate: values.birthdate,
      phonenumber: values.phonenumber,
    };

    dispatch(updateDoctor(data));
  };

  return (
    <Box m="20px">
      <Header title="Update my info" subtitle="Personal info" />
      {loading || loading2 ? (
        <Loader />
      ) : (
        <Formik onSubmit={handleFormSubmit} initialValues={selectedDoctor}>
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
                {
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="First name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      name={`firstname`}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Last name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      name={`lastname`}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name={`email`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Birthdate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.birthdate.split("T")[0]}
                      name={`birthdate`}
                      sx={{ gridColumn: "span 4" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Phone number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phonenumber}
                      name={`phonenumber`}
                      sx={{ gridColumn: "span 4" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                    <Field
                      className={`w-full bg-[#323948] text-white py-3 px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-4`}
                      as="select"
                      name={`gender`}
                      value={values.gender}
                      variant="filled"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Specialization"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.specialization}
                      name={`specialization`}
                      sx={{ gridColumn: "span 4" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Years of experience"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.yearsofexperience}
                      name={`yearsofexperience`}
                      sx={{ gridColumn: "span 4" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="fees"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fees}
                      name={`fees`}
                      sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      label="About"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.about}
                      name="about"
                      multiline
                      rows={4} // Specifies the number of visible rows
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                }
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" fullWidth>
                <Button
                  onClick={() => handleFormSubmit(values)}
                  color="secondary"
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
}

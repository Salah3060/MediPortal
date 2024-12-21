import { Box, Button, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUpdate,
  updatePassword,
  updatePatient,
} from "../Store/Slices/userSlice";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function UserInfo() {
  const [state, setState] = useState("");
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const user = useSelector((state) => state.user);
  const { loading, update } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (update) {
      //   dispatch(fetchDoctorById(doctorid));
      dispatch(resetUpdate());
      toast.success("Successfully updated!");
      setState("");
    }
  }, [dispatch, update]);

  function handleFormSubmit(values) {
    if (state === "info") {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        gender: values.gender,
        birthdate: values.birthdate,
        phonenumber: values.phonenumber,
      };
      dispatch(updatePatient(data));
    } else if (state === "pass") {
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      if (data.confirmPassword !== data.newPassword) {
        toast.error("New password and confirm password must be the same");
        return;
      }
      dispatch(updatePassword(data));
    }
  }
  return (
    <div
      className="fixed top-1/2 left-1/2 min-w-96 min-h-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-50
    p-10"
    >
      <div className="flex justify-center gap-x-2  p-4  ">
        <button
          className={`btn-2 !w-48 justify-center ${
            state === "info" ? "!bg-primary !text-white" : ""
          }`}
          onClick={() => {
            if (state === "info") {
              setState("");
            } else setState("info");
          }}
        >
          Change Info
        </button>
        <button
          className={`btn-2 !w-48 justify-center ${
            state === "pass" ? "!bg-primary !text-white" : ""
          }`}
          onClick={() => {
            if (state === "pass") {
              setState("");
            } else setState("pass");
          }}
        >
          Change password
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : state === "pass" ? (
        <Formik onSubmit={handleFormSubmit} initialValues={user}>
          {({ values, handleBlur, handleChange }) => (
            <form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
                {
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Old password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.oldPassword}
                      name={`oldPassword`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="New password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.newPassword}
                      name={`newPassword`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Confirm password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      name={`confirmPassword`}
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
      ) : (
        <Formik onSubmit={handleFormSubmit} initialValues={user}>
          {({ values, handleBlur, handleChange }) => (
            <form>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
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
                      disabled={state === ""}
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
                      disabled={state === ""}
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
                      disabled={state === ""}
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
                      disabled={state === ""}
                    />
                    <Field
                      className={`w-full py-3 bg-[#E8E8E8] px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-4`}
                      as="select"
                      name={`gender`}
                      value={values.gender}
                      variant="filled"
                      onBlur={handleBlur}
                      disabled={state === ""}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Birthdate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.birthdate}
                      name={`birthdate`}
                      sx={{ gridColumn: "span 4" }}
                      disabled={state === ""}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                  </>
                }
              </Box>

              {state !== "" && (
                <Box display="flex" justifyContent="end" mt="20px" fullWidth>
                  <Button
                    onClick={() => handleFormSubmit(values)}
                    color="primary"
                    variant="contained"
                  >
                    Update
                  </Button>
                </Box>
              )}
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}

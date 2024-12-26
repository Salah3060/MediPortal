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
import { resetUpdate, updatePassword } from "../../Store/Slices/userSlice";

export default function ChangePassword() {
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
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const handleFormSubmit = async (values) => {
    if (values.confirmPassword !== values.newPassword) {
      toast.error("New password & confirm password are not the same!");
      return;
    }
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    dispatch(updatePassword(data));
  };

  return (
    <Box m="20px">
      <Header title="Change my password" subtitle="" />
      {loading || loading2 ? (
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
      )}
    </Box>
  );
}

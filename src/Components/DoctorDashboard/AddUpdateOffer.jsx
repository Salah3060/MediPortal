import Header from "./HeaderTypo";
import { Box, Button, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllhospitals,
  fetchDoctorworkspaces,
} from "../../Store/Slices/WorkspaceSlice";

import { toast } from "react-toastify";
import Loader from "../Loader";

import { useParams } from "react-router-dom";
import {
  AddOffer,
  DoctorOffer,
  resetAdded,
  resetUpdated,
  UpdateOffer,
  resetError,
} from "../../Store/Slices/offersSlice";

export default function AddUpdateOffer() {
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const [state, setState] = useState("");
  const { loading, added, updated, error } = useSelector(
    (state) => state.offers
  );
  const { selectedDoctorWorkspaces } = useSelector((state) => state.workspaces);
  const { doctorOffers } = useSelector((state) => state.offers);
  const { doctorid } = useParams();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);
  useEffect(() => {
    dispatch(fetchAllhospitals());
    dispatch(fetchDoctorworkspaces(doctorid));
  }, [dispatch, doctorid]);
  const handleFormSubmit = async (values) => {
    if (state === "add") {
      const data = {
        percentage: values.percentage,
        startDate: values.startDate,
        endDate: values.endDate,
        offerDescription: values.offerdescription,
        offerName: values.offername,
      };
      const wid = values.workspaceid;

      dispatch(AddOffer({ data, id: +wid }));
    }
    if (state === "update") {
      if (!values.offerid) {
        toast.error("You have to select an offer first!");
        return;
      }
      const data = {
        percentage: values.updatePercentage,
        startDate: values.updateStartDate,
        endDate: values.updateEndDate,
        offerDescription: values.updateDescription,
        offerName: values.updatename,
      };
      const oid = values.offerid;
      dispatch(UpdateOffer({ data: data, id: oid }));
    }
  };
  useEffect(() => {
    dispatch(DoctorOffer(doctorid));
  }, [dispatch, doctorid]);
  useEffect(() => {
    if (state === "update") {
      dispatch(DoctorOffer(doctorid));
    }
  }, [dispatch, doctorid, state]);
  useEffect(() => {
    if (added) {
      toast.success("Added successfully!");
      dispatch(resetAdded());
      setState("");
    }
    if (updated) {
      toast.success("Updated successfully!");
      dispatch(resetUpdated());
      setSelected(false);
      setState("");
    }
    if (error) {
      toast.error("Something went wrong, please try again!");
      dispatch(resetError());
    }
  }, [updated, dispatch, added, error]);

  return (
    <Box m="20px">
      <Header title="Add/Update offer" subtitle="Manage your offers" />
      {loading ? (
        <Loader />
      ) : (
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({ values, handleBlur, handleChange, setValues }) => (
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
                  color={state === "add" ? `warning` : "secondary"}
                  sx={{ gridColumn: "span 2", height: "50px" }}
                  onClick={() => {
                    state === "add" ? setState("") : setState("add");
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color={state === "update" ? `warning` : "secondary"}
                  sx={{ gridColumn: "span 2", height: "50px" }}
                  onClick={() => {
                    state === "update" ? setState("") : setState("update");
                  }}
                >
                  Update
                </Button>
                {state === "add" && (
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Offer name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.offername}
                      name={`offername`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <Field
                      className={`w-full bg-[#323948] text-white py-3 px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-span-4`}
                      as="select"
                      name={`workspaceid`}
                      value={values.workspaceid}
                      variant="filled"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Choose a workspace location...
                      </option>
                      {selectedDoctorWorkspaces?.map((option, index) => (
                        <option key={index} value={option.workspaceid}>
                          {option.workspaceslocation}
                        </option>
                      ))}
                    </Field>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Percentage"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.percentage}
                      name={`percentage`}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Start date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.startDate}
                      name={`startDate`}
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="End date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.endDate}
                      name={`endDate`}
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.offerdescription}
                      name="offerdescription"
                      multiline
                      rows={4} // Specifies the number of visible rows
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                )}
                {state === "update" && (
                  <>
                    <select
                      className={`w-full bg-[#2D3343] text-white py-3 px-4 rounded-md border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none col-start-1 col-span-4`}
                      onChange={(e) => {
                        values.offerid = e.target.value;
                        const offer = doctorOffers.find(
                          (el) => el.offerid == values.offerid
                        );

                        setValues({
                          ...values,
                          updateDescription: offer.offerdescription,
                          updatename: offer.offername,
                          updatePercentage: offer.percentage,
                          updateStartDate: offer.startDate.split("T")[0],
                          updateEndDate: offer.endDate.split("T")[0],
                        });
                        setSelected(true);
                      }}
                    >
                      <option value="" disabled selected>
                        Choose an offer
                      </option>
                      {doctorOffers.map((option, index) => (
                        <option key={index} value={option.offerid}>
                          {option.offername}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {state === "update" && selected && (
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.updatename}
                      name="updatename"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.updateDescription}
                      name="updateDescription"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Percentage"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.updatePercentage}
                      name="updatePercentage"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Start date"
                      type="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.updateStartDate}
                      name="updateStartDate"
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      label="End date"
                      type="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.updateEndDate}
                      name="updateEndDate"
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays visible
                      }}
                    />
                  </>
                )}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px" fullWidth>
                {state !== "" && (
                  <Button
                    onClick={() => handleFormSubmit(values)}
                    color="secondary"
                    variant="contained"
                  >
                    {state === "add" ? "Add" : "Change"}
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
  offername: "",
  offerdescription: "",
  workspaceid: "",
  percentage: "",
  startDate: "",
  endDate: "",
  updatename: "",
  updateDescription: "",
  updatePercentage: "",
  updateStartDate: "",
  updateEndDate: "",
  offerid: "",
};

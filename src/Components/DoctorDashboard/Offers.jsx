/* eslint-disable no-unused-vars */
import Header from "./HeaderTypo";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "./theme";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import {
  cancelAvailibility,
  resetUpdateState,
} from "../../Store/Slices/WorkspaceSlice";
import { fetchDoctorById } from "../../Store/Slices/searchSlice";
import { useParams } from "react-router-dom";
import { getDoctorOffer } from "../../API/offerApi";
import { DoctorOffer } from "../../Store/Slices/offersSlice";
export default function DocOffers() {
  const dispatch = useDispatch();
  const { doctorOffers: rows, loading } = useSelector((state) => state?.offers);

  const { doctorid } = useParams();

  useEffect(() => {
    dispatch(DoctorOffer(doctorid));
  }, [dispatch, doctorid]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "offerid", headerName: "ID", cellClassName: "name-column--cell" },
    { field: "workspacename", headerName: "Workspace name", flex: 1 },
    { field: "startdate", headerName: "From", flex: 1 },
    {
      field: "enddate",
      headerName: "To",
      flex: 1,
    },
    {
      field: "percentage",
      headerName: "Percentage",
      flex: 1,
    },
    {
      field: "fees",
      headerName: "Fees",
      flex: 1,
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectionChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };
  return (
    <Box className="p-5 h-screen">
      <Header title="Offers" subtitle="Your all offers" />
      {loading ? (
        <Loader />
      ) : (
        <Box
          className="mt-10 w-full h-full overflow-auto bg-gray-800 rounded-lg shadow-md"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              padding: "10px",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={rows?.map((el, i) => ({ ...el, id: i })) || []}
            columns={columns.map((col) => ({
              ...col,
              flex: col.flex || 1, // Ensure columns expand equally
              minWidth: 150, // Set a minimum width for columns
            }))}
            onSelectionModelChange={handleSelectionChange}
          />
        </Box>
      )}
    </Box>
  );
}

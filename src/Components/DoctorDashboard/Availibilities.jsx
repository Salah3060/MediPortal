import Header from "./header";
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
export default function Availibilities() {
  const dispatch = useDispatch();
  const { availibility: rows } = useSelector(
    (state) => state?.search?.selectedDoctor
  );
  const { loading, updated } = useSelector((state) => state?.workspaces);

  const { doctorid } = useParams();

  useEffect(() => {
    if (updated) {
      dispatch(fetchDoctorById(doctorid));
      dispatch(resetUpdateState());
    }
  }, [updated]);
  async function deleteSelected() {
    console.log(selectedRows, rows);
    const data = selectedRows.map((el) => {
      return {
        data: {
          workingDay: rows[el].workingDay,
          startTime: rows[el].startTime,
        },
        id: rows[el].workSpaceId,
      };
    });
    dispatch(cancelAvailibility(data));
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "workingDay", headerName: "Day", flex: 1 },
    {
      field: "startTime",
      headerName: "From",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "endTime",
      headerName: "To",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectionChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };
  return (
    <>
      <Box m="20px">
        <Header title="Appointments" subtitle="Your all appointments" />
        {loading ? (
          <Loader />
        ) : (
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
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
              columns={columns}
              onSelectionModelChange={handleSelectionChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2, // Add some margin-top for spacing
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteSelected()}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

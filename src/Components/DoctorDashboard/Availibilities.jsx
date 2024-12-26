import Header from "./HeaderTypo";
import { Box, Button, ThemeProvider, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "./theme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import {
  cancelAvailibility,
  resetErrorState,
  resetUpdateState,
} from "../../Store/Slices/WorkspaceSlice";
import { fetchDoctorById } from "../../Store/Slices/searchSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Availibilities() {
  const dispatch = useDispatch();
  const { availibility: rows } = useSelector(
    (state) => state?.search?.selectedDoctor
  );
  const { loading, updated, error } = useSelector((state) => state?.workspaces);

  const { doctorid } = useParams();

  useEffect(() => {
    if (updated) {
      dispatch(fetchDoctorById(doctorid));
      dispatch(resetUpdateState());
      toast.success("Cancelled Successfully");
    }
  }, [dispatch, doctorid, updated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetErrorState());
    }
  }, [dispatch, error]);

  async function deleteSelected() {
    const data = selectedRows.map((el, i) => {
      return {
        data: {
          workingDay: rows[i]?.workingDay,
          startTime: rows[i]?.startTime,
        },
        id: rows[i]?.workSpaceId,
      };
    });
    console.log(data);

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
    <ThemeProvider theme={theme}>
      <Box m="20px">
        <Header title="Availabilities" subtitle="Your all availabilities" />
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
              rows={rows?.map((el, i) => ({ ...el, id: i + 1 })) || []}
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
    </ThemeProvider>
  );
}

import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "./theme";
import {
  CheckOutlined,
  CloseOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  changeAppointment,
  fetchAllAppointments,
} from "../../Store/Slices/AppointmentsSlice";
import Loader from "../Loader";
import Header from "./HeaderTypo.jsx";
export default function Appointments() {
  const dispatch = useDispatch();
  const { doctorid } = useParams();
  const { Appointments: rows, loading } = useSelector(
    (state) => state.appointments
  );
  useEffect(() => {
    async function fetchMyAppointments() {
      dispatch(fetchAllAppointments(doctorid));
    }
    fetchMyAppointments();
  }, [dispatch, doctorid]);
  async function changeStatus(st) {
    dispatch(
      changeAppointment({ id: selectedRows, status: st, docid: doctorid })
    );
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "workspaceid", headerName: "Workspace ID" },
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "bookingdate",
      headerName: "Booking Date",
      flex: 1,
    },
    {
      field: "appointmentdate",
      headerName: "Appointment Date",
      flex: 1,
    },
    {
      field: "paymentstatus",
      headerName: "Payment status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "appointmentstatus",
      headerName: "Appointment Status",
      flex: 1,
      renderCell: ({ row: { appointmentstatus } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              appointmentstatus === "Completed"
                ? "#22c55e"
                : appointmentstatus === "Cancelled"
                ? "#c2410c"
                : "#f59e0b"
            }
            borderRadius="4px"
          >
            {appointmentstatus === "admin" && <TimerOutlined />}
            {appointmentstatus === "manager" && <CloseOutlined />}
            {appointmentstatus === "user" && <CheckOutlined />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {appointmentstatus}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectionChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };
  return (
    <>
      <Box className="p-5 h-screen">
        <Header title="Appointments" subtitle="Your all appointments" />
        {loading ? (
          <Loader />
        ) : (
          <Box className="mt-10 w-full h-full overflow-auto  rounded-lg shadow-md">
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns.map((col) => ({
                ...col,
                flex: col.flex || 1, // Ensure columns expand equally
                minWidth: 150, // Set a minimum width for columns
              }))}
              onSelectionModelChange={handleSelectionChange}
              sx={{
                height: "75%",
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  padding: "10px", // Add padding for better readability
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                  fontSize: "1rem", // Increase font size for headers
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
            />
            <Box className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
              <Button
                variant="contained"
                color="success"
                onClick={() => changeStatus(1)}
                className="w-full md:w-auto"
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => changeStatus(0)}
                className="w-full md:w-auto"
              >
                Decline
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

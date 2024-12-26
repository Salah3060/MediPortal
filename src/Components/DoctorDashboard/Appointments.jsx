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
              rows={rows}
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
                color="success"
                onClick={() => changeStatus(1)}
                sx={{ mr: 2 }} // Add margin-right for spacing
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => changeStatus(0)}
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

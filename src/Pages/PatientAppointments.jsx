import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  fetchPatientAppointments,
  resetCancelledStatus,
  resetError,
} from "../Store/Slices/AppointmentsSlice";
import Loader from "../Components/Loader";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  CheckOutlined,
  CloseOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import { tokens } from "../Components/DoctorDashboard/theme";
import { useTheme } from "@emotion/react";

import { toast } from "react-toastify";
import { scrollToTop } from "../Utils/functions.util";

export default function PatientAppointments() {
  useEffect(() => {
    document.title = "MediPortal | My Appointments";
    scrollToTop();
  }, []);
  const { userid: patientId } = useSelector((state) => state.user);
  const {
    loading,
    error,
    PatientAppointments: rows,
    appointmentCancelled,
  } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPatientAppointments(patientId));
  }, [dispatch, patientId]);
  useEffect(() => {
    if (!appointmentCancelled) return;
    toast.success("Your appointment was cancelled successfully!");
    dispatch(resetCancelledStatus());
    dispatch(fetchPatientAppointments(patientId));
  }, [appointmentCancelled, dispatch, patientId]);
  useEffect(() => {
    if (!error) return;
    toast.error("Something went wrong, please try again!");
    dispatch(resetError());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "doctorName",
      headerName: "Doctor Name",
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
            <Typography color={"white"} sx={{ ml: "5px" }}>
              {appointmentstatus}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const { appointmentstatus, appointmentid } = params.row;

        const handleCancelClick = () => {
          // Add your logic to handle "Cancel" action
          dispatch(cancelAppointment(appointmentid));
        };

        if (appointmentstatus === "Scheduled") {
          return (
            <Box display="flex" justifyContent={"center"} width={"100%"}>
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelClick}
                className="w-40 rounded-sm shadow-md"
              >
                Cancel
              </Button>
            </Box>
          );
        } else if (
          appointmentstatus === "Completed" ||
          appointmentstatus === "Cancelled"
        ) {
          return (
            <Typography color="gray" textAlign={"center"} width={"100%"}>
              No actions available
            </Typography>
          );
        }

        return null; // Render nothing for other statuses
      },
    },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectionChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };
  return (
    <>
      <div className="min-h-lvh">
        <Box m="20px">
          <h1 className="text-4xl font-bold text-center text-white bg-primary/100 p-4 rounded-lg shadow-lg mt-6 mb-4">
            Appointments
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <Box
              className="min-h-lvh"
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
                  backgroundColor: "rgb(86 210 216)",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "rgb(86 210 216)",
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
              ></Box>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}

import { Box, Typography } from "@mui/material";
import Header from "./HeaderTypo.jsx";
import Loader from "../Loader";
import StatBox from "./statBox";
import { tokens } from "./theme.js";
import { useTheme } from "@emotion/react";

import {
  AttachMoneySharp,
  CalendarMonthSharp,
  CheckCircleOutlineSharp,
  CreditCard,
  RemoveCircleOutlineSharp,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DoctorPatients,
  getAppointmentStats,
} from "../../Store/Slices/AppointmentsSlice.js";
import { formatDate } from "../../Utils/functions.util.jsx";
export default function Stats() {
  const { doctorid } = useParams();
  const { doctorPatients, loading } = useSelector(
    (state) => state.appointments
  );

  const { reviews } = useSelector((state) => state.search.selectedDoctor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointmentStats(doctorid));
  }, [dispatch, doctorid]);
  useEffect(() => {
    dispatch(DoctorPatients(doctorid));
  }, [dispatch, doctorid]);

  const { stats: appStats } = useSelector((state) => state.appointments);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Header title="Dashboard" subtitle="Welcome to your dashboard" />

          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(400px, 1fr))"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={appStats.completedappointments || 0}
                subtitle="Completed appointments"
                progress={appStats.completedpercentage / 100.0 || 0}
                increase={`${appStats.completedpercentage || 0}%`}
                icon={
                  <CheckCircleOutlineSharp
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={appStats.scheduledappointments || 0}
                subtitle="Scheduled appointments"
                progress={appStats.scheduledpercentage / 100.0 || 0}
                increase={`${appStats.scheduledpercentage || 0}%`}
                icon={
                  <CalendarMonthSharp
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={appStats.cancelledappointments || 0}
                subtitle="Cancelled appointments"
                progress={appStats.cancelledpercentage / 100.0 || 0}
                increase={`${appStats.cancelledpercentage || 0}%`}
                icon={
                  <RemoveCircleOutlineSharp
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className="col-span-1"
            >
              <StatBox
                title={appStats.cashappointments || 0}
                subtitle="Cash paid"
                progress={appStats.cashpercentage / 100.0 || 0}
                increase={`${appStats.cashpercentage || 0}%`}
                icon={
                  <AttachMoneySharp
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className="col-span-1"
            >
              <StatBox
                title={appStats.onlineappointments || 0}
                subtitle="Visa Paid"
                progress={appStats.onlinepercentage / 100.0 || 0}
                increase={`${appStats.onlinepercentage || 0}%`}
                icon={
                  <CreditCard
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>

            {/* ROW 2 */}
            <div className="grid grid-cols-2 gap-4">
              <Box
                p="20px"
                backgroundColor={colors.primary[400]}
                gridColumn="span 1"
                gridRow="span 1"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Total Patients
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  {doctorPatients?.length} patients
                </Typography>
              </Box>

              <Box
                gridColumn="span 1"
                gridRow="span 1"
                backgroundColor={colors.primary[400]}
              >
                <Box p="20px">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Total Reviews
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {reviews?.length} reviews
                  </Typography>
                </Box>
              </Box>
            </div>

            <Box
              gridColumn="span 1"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box p="15px" borderBottom={`4px solid ${colors.primary[500]}`}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  My Patients
                </Typography>
              </Box>
              {doctorPatients?.map((el, i) => (
                <Box
                  key={`${el.patientid}-${i}`}
                  p="15px"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                >
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                  >
                    {el.patientid}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {el.patientname}
                  </Typography>
                  <Typography color={colors.grey[100]}>{el.email}</Typography>
                </Box>
              ))}
            </Box>
            <Box
              gridColumn="span 1"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box p="15px" borderBottom={`4px solid ${colors.primary[500]}`}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  My Reviews
                </Typography>
              </Box>
              {reviews?.map((el, i) => (
                <Box
                  key={`${i}`}
                  p="15px"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                >
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                  >
                    {el?.patient?.firstName + " " + el?.patient?.lastName}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {formatDate(el?.reviewDate)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

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
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 4"
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
              gridColumn="span 4"
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
              gridColumn="span 4"
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
              gridColumn="span 6"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
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
              gridColumn="span 6"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
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
            <Box gridColumn="span 4" gridRow="span 2">
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
              >
                <Box
                  mt="25px"
                  p="20px 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                      marginBottom={"10px"}
                    >
                      Total Patients
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={colors.greenAccent[500]}
                    >
                      {doctorPatients?.length} {"  "}patients
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                gridColumn="span 4"
                gridRow="span 1"
                backgroundColor={colors.primary[400]}
              >
                <Box
                  mt="25px"
                  p="20px 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                      marginBottom={"10px"}
                    >
                      Total Reviews
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={colors.greenAccent[500]}
                    >
                      {reviews?.length} {"  "}review
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  My patients
                </Typography>
              </Box>
              {doctorPatients?.map((el, i) => (
                <Box
                  key={`${el.patientid}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {el.patientid}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {el.patientname}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{el.email}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    {el.gender}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  My reviews
                </Typography>
              </Box>
              {reviews?.map((el, i) => (
                <Box
                  key={`${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {el?.patient?.firstName + " " + el?.patient?.lastName}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>
                    {formatDate(el?.reviewDate)}
                  </Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    {el?.rate}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ROW 3 */}
            {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
          </Box> */}
          </Box>
        </Box>
      )}
    </>
  );
}

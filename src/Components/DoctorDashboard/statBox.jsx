import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme.js";
import ProgressCircle from "./ProgressCircle.jsx";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100], marginTop: "10px" }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;

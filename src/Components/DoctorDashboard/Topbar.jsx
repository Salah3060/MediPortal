import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { IoIosLogOut } from "react-icons/io";
import { clearUser, logout } from "../../Store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Topbar = ({ setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispath = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispath(clearUser());
    dispath(logout());
    toast.success("Logging out...");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            navigate(".");
            setSelected("Dashboard");
          }}
        >
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            navigate("./changePassword");
            setSelected("Change password");
          }}
        >
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            navigate("./UpdateMe");
            setSelected("Update my info");
          }}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <IoIosLogOut className="text-xl hover:text-tertiary cursor-pointer " />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

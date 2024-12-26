/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { PiHospitalBold, PiTimer } from "react-icons/pi";
import {
  FaKey,
  FaMoneyBill,
  FaPlus,
  FaQuestion,
  FaRegAddressCard,
  FaRegClock,
} from "react-icons/fa";
import { clearUser, logout } from "../../Store/Slices/userSlice";
import { uploadDoctor } from "../../API/uploadApi";
const SidebarItem = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  setSelectedFile,
  handleUpload,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ListItem
      button
      onClick={() => setSelected(title)}
      selected={selected === title}
      component={Link}
      to={to}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} sx={{ color: colors.grey[100] }} />
    </ListItem>
  );
};

const Sidebar = ({
  name,
  userimg,
  spec,
  selected,
  setSelected,
  handleFileChange,
  handleUpload,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="persistent"
        open={true}
        sx={{
          width: isCollapsed ? 60 : 240, // Adjust width based on collapsed state
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 60 : 240,
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            paddingTop: "20px",
            transition: "width 0.3s", // Add transition for smooth collapse effect
            overflow: "hidden", // Prevent overflow of content
          },
        }}
      >
        {/* Menu Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml="15px"
        >
          <Typography variant="h6" color={colors.grey[100]}>
            {!isCollapsed && "Doctor"}
          </Typography>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>

        {/* Profile Info (only visible when expanded) */}
        {!isCollapsed && (
          <Box
            mb="25px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              alt="profile-user"
              width="100px"
              height="100px"
              className="rounded-full"
              src={`${userimg}||/doctor.png`}
            />
          </Box>
        )}

        {!isCollapsed && (
          <div className="flex flex-col items-center gap-3">
            <Box textAlign="center" mb="20px">
              <Typography
                variant="h6"
                color={colors.grey[100]}
                fontWeight="bold"
              >
                {name}
              </Typography>
              <Typography variant="body2" color={colors.greenAccent[500]}>
                {spec} Doctor
              </Typography>
            </Box>
            <div className="flex items-center gap-3">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 transition"
              >
                {"Select Photo"}
              </label>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`btn-2 ${
                  isUploading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600 transition"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        )}

        {/* Sidebar Menu */}
        <List>
          <SidebarItem
            title="Dashboard"
            to="."
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Update my info"
            to="./UpdateMe"
            icon={<FaRegAddressCard />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Change password"
            to="./changePassword"
            icon={<FaKey />}
            selected={selected}
            setSelected={setSelected}
          />

          <SidebarItem
            title="Add Workspaces"
            to="./Workspaces"
            icon={<PiHospitalBold />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Availabilities"
            to="./Availabilities"
            icon={<PiTimer />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Appointments"
            to="./Appointments"
            icon={<FaRegClock />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Offers"
            to="./Offers"
            icon={<FaMoneyBill />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Add/Update offer"
            to="./Add-UpdateOffers"
            icon={<FaPlus />}
            selected={selected}
            setSelected={setSelected}
          />

          <SidebarItem
            title="Answer Questions"
            to="./answerQuestions"
            icon={<FaQuestion />}
            selected={selected}
            setSelected={setSelected}
          />
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

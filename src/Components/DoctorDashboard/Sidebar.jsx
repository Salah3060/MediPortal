/* eslint-disable react/prop-types */
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
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

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ name, spec, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Doctor
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="/MediPortal/doctor.png"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {spec} Doctor
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} minHeight={"100%"}>
            <Item
              title="Dashboard"
              to="."
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update my info"
              to="./UpdateMe"
              icon={<FaRegAddressCard />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change password"
              to="./changePassword"
              icon={<FaKey />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage
            </Typography>
            <Item
              title="Add Workspaces"
              to="./Workspaces"
              icon={<PiHospitalBold />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Availibilities"
              to="./Availibilities"
              icon={<PiTimer />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Appointments"
              to="./Appointments"
              icon={<FaRegClock />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Offers"
              to="./Offers"
              icon={<FaMoneyBill />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add/Update offer"
              to="./Add-UpdateOffers"
              icon={<FaPlus />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Questions
            </Typography>
            <Item
              title="Answer Questions"
              to="./answerQuestions"
              icon={<FaQuestion />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

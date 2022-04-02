import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "features/Dashboard/components/AppBar";
import Drawer from "features/Dashboard/components/Drawer";
import DashboardContent from "features/Dashboard/Home";

const drawerWidth = 250;

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar drawerWidth={drawerWidth} />
      <Drawer drawerWidth={drawerWidth} />
      <DashboardContent />
    </Box>
  );
};

export default Dashboard;

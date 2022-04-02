import Box from "@mui/material/Box";
import AppBar from "features/Dashboard/components/AppBar";
import Drawer from "features/Dashboard/components/Drawer";
import HomeContent from "features/Dashboard/Home";
import { Routes, Route, Navigate } from "react-router-dom";

const drawerWidth = 250;

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar drawerWidth={drawerWidth} />
      <Drawer drawerWidth={drawerWidth} />
      <Routes>
        <Route path="/home" element={<HomeContent />} />
        <Route path="/" element={<Navigate to="/dashboard/home" />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Box>
  );
};

export default Dashboard;

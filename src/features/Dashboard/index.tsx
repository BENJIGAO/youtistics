import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "features/Dashboard/components/AppBar";
import Drawer from "features/Dashboard/components/Drawer";
import Home from "features/Dashboard/Home";
import Channels from "./Channels";
import LikedVideos from "./LikedVideos";
import Statistics from "./Statistics";
import Subscriptions from "./Subscriptions";

const drawerWidth = 250;

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar drawerWidth={drawerWidth} />
      <Drawer drawerWidth={drawerWidth} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/" element={<Navigate to="/dashboard/home" />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Box>
  );
};

export default Dashboard;

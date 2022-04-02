import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InsightsIcon from "@mui/icons-material/Insights";
import YoutisticsLogo from "common/components/YoutisticsLogo";

interface IDrawerProps {
  drawerWidth: number;
}

const CustomDrawer = styled(MuiDrawer)(() => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  },
}));

const CustomListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  borderLeftWidth: theme.spacing(0.75),
  borderLeftColor: selected ? theme.palette.primary.light : "transparent",
  borderLeftStyle: "solid",
}));

const Drawer = ({ drawerWidth }: IDrawerProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    route: string
  ) => {
    setSelectedIndex(index);
    navigate("/dashboard" + route);
  };

  return (
    <CustomDrawer variant="permanent" sx={{ width: drawerWidth }}>
      <YoutisticsLogo />
      <Divider />
      <List
        component="nav"
        aria-label="main dashboard items"
        sx={{ padding: 0 }}
      >
        <CustomListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, "/home")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, "/subscriptions")}
        >
          <ListItemIcon>
            <SubscriptionsIcon />
          </ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2, "/liked-videos")}
        >
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText primary="Liked Videos" />
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3, "/channels")}
        >
          <ListItemIcon>
            <YouTubeIcon />
          </ListItemIcon>
          <ListItemText primary="Other Channels" />
        </CustomListItemButton>
        <CustomListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4, "/statistics")}
        >
          <ListItemIcon>
            <InsightsIcon />
          </ListItemIcon>
          <ListItemText primary="Fun Statistics" />
        </CustomListItemButton>
      </List>
    </CustomDrawer>
  );
};

export default Drawer;

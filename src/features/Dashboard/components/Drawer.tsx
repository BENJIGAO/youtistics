import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemLink from "features/Dashboard/components/ListItemLink";
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InsightsIcon from "@mui/icons-material/Insights";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

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

const Drawer = (props: IDrawerProps) => {
  const { drawerWidth } = props;
  return (
    <CustomDrawer variant="permanent" sx={{ width: drawerWidth }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: 1,
        }}
      >
        Youtistics
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemLink to="/dashboard/home" primary="Home" icon={<HomeIcon />} />
        <ListItemLink
          to="/dashboard/subscriptions"
          primary="Subscriptions"
          icon={<SubscriptionsIcon />}
        />
        <ListItemLink
          to="/dashboard/liked-videos"
          primary="Liked Videos"
          icon={<ThumbUpIcon />}
        />
        <ListItemLink
          to="/dashboard/channels"
          primary="Other Channels"
          icon={<YouTubeIcon />}
        />
        <ListItemLink
          to="/dashboard/statistics"
          primary="Fun Statistics"
          icon={<InsightsIcon />}
        />
      </List>
    </CustomDrawer>
  );
};

export default Drawer;

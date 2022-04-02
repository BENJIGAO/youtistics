import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemLink from "features/Dashboard/components/ListItemLink";
import HomeIcon from "@mui/icons-material/Home";

interface IDrawerProps {
  drawerWidth: number;
}

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
          justifyContent: "flex-end",
          px: 1,
        }}
      ></Toolbar>
      <Divider />
      <List component="nav">
        <ListItemLink to="/dashboard/home" primary="Home" icon={<HomeIcon />} />
      </List>
    </CustomDrawer>
  );
};

export default Drawer;

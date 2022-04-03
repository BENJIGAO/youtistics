import { Avatar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

interface IAppBarProps {
  drawerWidth: number;
}

const AppBar = ({ drawerWidth }: IAppBarProps) => {
  return (
    <MuiAppBar
      position="absolute"
      sx={{ width: `calc(100% - ${drawerWidth}px)` }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <Avatar>B</Avatar>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface IAppBarProps {
  drawerWidth: number;
}

const AppBar = (props: IAppBarProps) => {
  const { drawerWidth } = props;
  return (
    <MuiAppBar
      position="absolute"
      sx={{ width: `calc(100% - ${drawerWidth}px)` }}
    >
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

const YoutisticsLogo = () => {
  return (
    <ListItem>
      <ListItemIcon>
        <BubbleChartIcon color="error" fontSize="large" />
      </ListItemIcon>
      <Typography variant="button" fontSize={18}>
        Youtistics
      </Typography>
    </ListItem>
  );
};

export default YoutisticsLogo;

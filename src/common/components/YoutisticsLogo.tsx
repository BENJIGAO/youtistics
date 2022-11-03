import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

interface IYoutisticsLogoProps {
  isWhite?: boolean;
}

const YoutisticsLogo = ({ isWhite = false }: IYoutisticsLogoProps) => {
  return (
    <ListItem>
      <ListItemIcon>
        <BubbleChartIcon sx={{ color: "#EC111B" }} fontSize="large" />
      </ListItemIcon>
      <Typography
        variant="button"
        fontSize={18}
        sx={isWhite ? { color: "white" } : {}}
      >
        Youtistics
      </Typography>
    </ListItem>
  );
};

export default YoutisticsLogo;

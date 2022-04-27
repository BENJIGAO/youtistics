import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import OverlayScrollbar from "common/components/OverlayScrollbar";

interface IMadeForKidsCardProps {
  madeForKidsRatio: [number, number];
}

const MadeForKidsCard = ({ madeForKidsRatio }: IMadeForKidsCardProps) => {
  return (
    <OverlayScrollbar>
      <Paper sx={{ height: 252, p: 3 }}>
        <Typography variant="h6">Made for Kids</Typography>
        <Typography variant="h1" color="primary">
          {(madeForKidsRatio[0] / madeForKidsRatio[1]).toFixed()}%
        </Typography>
        <Typography variant="body1">
          of your subscriptions were made for kids. Not many!
        </Typography>
      </Paper>
    </OverlayScrollbar>
  );
};

export default MadeForKidsCard;

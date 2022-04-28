import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import OverlayScrollbar from "common/components/OverlayScrollbar";

interface IMadeForKidsCardProps {
  madeForKidsRatio: [number, number];
}

const MadeForKidsCard = ({ madeForKidsRatio }: IMadeForKidsCardProps) => {
  const getCustomMessage = (ratio: [number, number]): string => {
    const percentage = (ratio[0] * 100) / ratio[1];
    if (percentage < 25) {
      return "Not many!";
    } else if (percentage < 50) {
      return "A decent amount.";
    } else if (percentage < 75) {
      return "That's a lot!";
    } else {
      return "Holy cow!";
    }
  };

  return (
    <OverlayScrollbar>
      <Paper sx={{ height: 252, p: 3 }}>
        <Typography variant="h6">Made for Kids</Typography>
        <Typography variant="h1" color="primary">
          {((madeForKidsRatio[0] * 100) / madeForKidsRatio[1]).toFixed()}%
        </Typography>
        <Typography variant="body1">
          of your subscriptions were made for kids.{" "}
          {getCustomMessage(madeForKidsRatio)}
        </Typography>
      </Paper>
    </OverlayScrollbar>
  );
};

export default MadeForKidsCard;

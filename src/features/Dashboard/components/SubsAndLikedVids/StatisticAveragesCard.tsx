import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import VideocamIcon from "@mui/icons-material/Videocam";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { nFormatter } from "common/utils/generalUtils";

interface IStatisticAveragesCardProps {
  averageViewCount: number;
  averageSubscriberCount: number;
  averageVideoCount: number;
}

const StatisticAveragesCard = ({
  averageViewCount,
  averageSubscriberCount,
  averageVideoCount,
}: IStatisticAveragesCardProps) => {
  return (
    <Paper sx={{ height: 252, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Averages
      </Typography>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} alignItems="center">
          <VisibilityIcon fontSize="large" color="primary" />
          <Typography>
            {nFormatter(averageViewCount.toString(), 1)} views
          </Typography>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="center">
          <PersonIcon fontSize="large" color="primary" />
          <Typography>
            {nFormatter(averageSubscriberCount.toString(), 1)} subscribers
          </Typography>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="center">
          <VideocamIcon fontSize="large" color="primary" />
          <Typography>
            {nFormatter(averageVideoCount.toString(), 1)} videos
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default StatisticAveragesCard;

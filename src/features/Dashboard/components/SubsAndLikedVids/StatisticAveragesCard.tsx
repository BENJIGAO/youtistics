import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface IStatisticAveragesCardProps {
  statistic1: string;
  statistic2: string;
  statistic3: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  icon3: React.ReactNode;
}

const StatisticAveragesCard = ({
  statistic1,
  statistic2,
  statistic3,
  icon1,
  icon2,
  icon3,
}: IStatisticAveragesCardProps) => {
  return (
    <Paper sx={{ height: 252, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Averages
      </Typography>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} alignItems="center">
          {icon1}
          <Typography>{statistic1}</Typography>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="center">
          {icon2}
          <Typography>{statistic2}</Typography>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="center">
          {icon3}
          <Typography>{statistic3}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default StatisticAveragesCard;

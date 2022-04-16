import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import BarChart from "features/Dashboard/Subscriptions/components/charts/BarChart";
import PieChart from "features/Dashboard/Subscriptions/components/charts/PieChart";

const Subscriptions = () => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <PieChart />
      </Grid>
      <Grid item xs={4}>
        <Stack>
          <Box>
            <BarChart />
          </Box>
          <Box>
            <BarChart />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Subscriptions;

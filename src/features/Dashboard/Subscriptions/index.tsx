import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ScatterChart from "features/Dashboard/Subscriptions/components/charts/ScatterChart";
import PieChart from "features/Dashboard/Subscriptions/components/charts/PieChart";
import GaugeChart from "features/Dashboard/Subscriptions/components/charts/GaugeChart";
import Copyright from "common/components/Copyright";

const Subscriptions = () => {
  return (
    <Box sx={{ m: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: 520 }}>
            <PieChart />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ height: 252 }}>
              <Paper sx={{ width: "50%" }}>
                <Typography variant="h6">
                  Sports were your favourite category
                </Typography>
              </Paper>
              <Paper sx={{ width: "50%" }}>
                <Typography variant="h6">
                  Cooking was your least favourite category
                </Typography>
              </Paper>
            </Stack>
            <Paper sx={{ height: 252 }}>
              <ScatterChart />
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <Paper sx={{ height: 252 }}>
            <GaugeChart />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <Paper sx={{ height: 252 }}>
            <GaugeChart />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6} xl={6}>
          <Paper sx={{ height: 252 }}>
            <ScatterChart />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <Paper sx={{ height: 252 }}>
            <Typography variant="h6">
              RDCWorld1 is your favourite channel!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ mt: 5 }}>
          <Copyright />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Subscriptions;

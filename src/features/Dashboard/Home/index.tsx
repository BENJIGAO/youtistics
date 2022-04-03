import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Copyright from "common/components/Copyright";
import { getSubscriptions } from "common/utils/apiUtils";
import { Typography, Box } from "@mui/material";

const Home = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions()
      .then((res) => setSubscriptions(res.result.items))
      .catch((err) => console.log(err));
  }, []);

  console.log(subscriptions);

  return (
    <Box sx={{ m: 4 }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            Recent Subscriptions
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            Recent Liked Videos
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}></Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Box>
  );
};

export default Home;

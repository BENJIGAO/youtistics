import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Subscription } from "@types";
import Copyright from "common/components/Copyright";
import { getSubscriptions } from "common/utils/apiUtils";
import { Typography, Box } from "@mui/material";
import SubscriptionCard from "./components/SubscriptionCard";

const Home = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    getSubscriptions()
      .then((res) => setSubscriptions(res.result.items ?? []))
      .catch((err) => console.log(err));
  }, []);

  console.log(subscriptions);

  return (
    <Box sx={{ m: 4 }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            Recent Subscriptions
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={3}>
          {subscriptions !== [] &&
            subscriptions.map((sub, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <SubscriptionCard
                    channelId={sub.snippet?.resourceId?.channelId}
                    channelTitle={sub.snippet?.title}
                    channelDescription={sub.snippet?.description}
                    channelImageUrl={sub.snippet?.thumbnails?.high?.url}
                  />
                </Grid>
              );
            })}
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

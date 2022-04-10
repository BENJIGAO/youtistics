import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Subscription, ChannelStatistics, Channel } from "@types";
import Copyright from "common/components/Copyright";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import SubscriptionCard from "features/Dashboard/Home/components/SubscriptionCard";

const Home = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [channelStats, setChannelStats] = useState<ChannelStatistics[]>([]);

  // Gets users subscriptions on load
  useEffect(() => {
    getSubscriptions().then((subscriptions) =>
      setSubscriptions(subscriptions ?? [])
    );
  }, []);

  // Set channelStats when subscriptions is populated because it needs it for sorting as a reference array
  useEffect(() => {
    setChannelStatsWithSubscriptions(subscriptions);
  }, [subscriptions]);

  const setChannelStatsWithSubscriptions = (
    subs: Subscription[] | undefined
  ): void => {
    if (subs === undefined) {
      return;
    }
    const subscriptionIds = subs
      .map((sub) => sub.snippet?.resourceId?.channelId)
      .filter((id): id is string => id !== undefined);

    getChannelByIds(subscriptionIds).then((channels) =>
      sortAndSetChannelStats(channels)
    );
  };

  const sortAndSetChannelStats = (channels: Channel[] | undefined) => {
    if (channels === undefined) {
      return;
    }
    const refArr = subscriptions
      .map((channel) => channel.snippet?.title)
      .filter((title): title is string => title !== undefined);

    const sortedChannels: Channel[] = channels.slice().sort((a, b) => {
      return (
        refArr.indexOf(a.snippet?.localized?.title || "") -
        refArr.indexOf(b.snippet?.localized?.title || "")
      );
    });

    const sortedStatistics = sortedChannels
      .map((channel) => channel.statistics)
      .filter((stats): stats is ChannelStatistics => stats !== undefined);

    setChannelStats(sortedStatistics);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            Recent Subscriptions
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={3}>
          {subscriptions.map((sub, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
                <SubscriptionCard
                  channelTitle={sub.snippet?.title}
                  channelDescription={sub.snippet?.description}
                  channelImageUrl={sub.snippet?.thumbnails?.high?.url}
                  channelStats={channelStats[index]}
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

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Subscription, Channel } from "@types";
import Copyright from "common/components/Copyright";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import ScatterChart from "features/Dashboard/Subscriptions/components/charts/ScatterChart";
import PieChart from "features/Dashboard/Subscriptions/components/charts/PieChart";
import GaugeChart from "features/Dashboard/Subscriptions/components/charts/GaugeChart";
import { topicIdMap } from "./topicIdMap";

interface ITopicOccurences {
  [key: string]: number;
}

interface ITopicOccurencesForChart {
  name: string;
  value: number;
}

const Subscriptions = () => {
  const [topicOccurencesForChart, setTopicOccurencesForChart] = useState<
    ITopicOccurencesForChart[]
  >([]);
  // Gets users subscriptions on load
  useEffect(() => {
    let abortController = new AbortController();
    getSubscriptions(100).then((subscriptions) => {
      getAndProcessChannels(subscriptions);
    });
    return () => abortController.abort();
  }, []);

  const getAndProcessChannels = (subs: Subscription[] | undefined): void => {
    if (subs === undefined) {
      return;
    }
    const subscriptionIds = subs
      .map((sub) => sub.snippet?.resourceId?.channelId)
      .filter((id): id is string => id !== undefined);

    getChannelByIds(subscriptionIds).then((channels) => {
      const occurences = getTopicOccurrencesForChart(channels);
      setTopicOccurencesForChart(occurences);
    });
  };

  const getTopicOccurrencesForChart = (
    channels: Channel[] | undefined
  ): ITopicOccurencesForChart[] => {
    if (channels === undefined) {
      return [];
    }
    const occurences: ITopicOccurences = {};

    channels.forEach((channel) => {
      const topicIds = channel.topicDetails?.topicIds ?? [];
      topicIds.forEach((topicId) => {
        occurences[topicIdMap[topicId]] !== undefined
          ? occurences[topicIdMap[topicId]]++
          : (occurences[topicIdMap[topicId]] = 1);
      });
    });

    return convertTopicOccurences(occurences);
  };

  const convertTopicOccurences = (
    occurences: ITopicOccurences
  ): ITopicOccurencesForChart[] => {
    const convertedData: ITopicOccurencesForChart[] = [];
    for (const [topicName, count] of Object.entries(occurences)) {
      convertedData.push({
        name: topicName,
        value: count,
      });
    }

    return convertedData;
  };

  return (
    <Box sx={{ m: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: 520 }}>
            <PieChart data={topicOccurencesForChart} />
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

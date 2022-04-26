import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Subscription, Channel } from "@types";
import Copyright from "common/components/Copyright";
import CustomPopover from "common/components/Popover";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import ScatterChart from "features/Dashboard/Subscriptions/components/charts/ScatterChart";
import PieChart from "features/Dashboard/Subscriptions/components/charts/PieChart";
import GaugeChart from "features/Dashboard/Subscriptions/components/charts/GaugeChart";
import { groupedIdMap, topicIdMap } from "./topicIdMap";

interface ITopicOccurences {
  // key = Topic id
  // value = Occurence of topic
  [key: string]: number;
}
interface IGroupedTopicOccurences {
  // key = General category name (e.g., Gaming)
  // value = Object containing topic occurences that fall under the general category
  [key: string]: ITopicOccurences;
}

interface IPieChartData {
  name: string;
  value: number;
}

const Subscriptions = () => {
  const [groupedTopicOccurences, setGroupedTopicOccurences] =
    useState<IGroupedTopicOccurences>({});

  // Gets users subscriptions on load
  useEffect(() => {
    let abortController = new AbortController();
    getSubscriptions(100).then((subscriptions) => {
      getAndProcessChannels(subscriptions);
    });
    return () => abortController.abort();
  }, []);

  // Makes channels.list call with ids from subscriptions and processes the result
  const getAndProcessChannels = (subs: Subscription[] | undefined): void => {
    if (subs === undefined) {
      return;
    }
    const subscriptionIds = subs
      .map((sub) => sub.snippet?.resourceId?.channelId)
      .filter((id): id is string => id !== undefined);

    getChannelByIds(subscriptionIds).then((channels) => {
      const occurences = getGroupedTopicOccurrences(channels);
      setGroupedTopicOccurences(occurences);
    });
  };

  // Converts channels to group topic occurences state
  const getGroupedTopicOccurrences = (
    channels: Channel[] | undefined
  ): IGroupedTopicOccurences => {
    if (channels === undefined) {
      return {};
    }
    const occurences: IGroupedTopicOccurences = {
      Music: {},
      Gaming: {},
      Sports: {},
      Entertainment: {},
      Lifestyle: {},
      Society: {},
      Other: {},
    };

    channels.forEach((channel) => {
      const topicIds = channel.topicDetails?.topicIds ?? [];
      topicIds.forEach((topicId) => {
        // Loops through each of the general categories to see if there's a match
        for (const [groupName, idMap] of Object.entries(groupedIdMap)) {
          if (
            idMap[topicId] !== undefined &&
            topicIdMap[topicId] !== undefined
          ) {
            // Increment the topic within a general topic by one
            occurences[groupName][topicIdMap[topicId]] !== undefined
              ? occurences[groupName][topicIdMap[topicId]]++
              : (occurences[groupName][topicIdMap[topicId]] = 1);
            break;
          }
        }
      });
    });

    return occurences;
  };

  // Converts group topics occurences state to pie chart data
  const convertToPieChartData = (
    occurences: IGroupedTopicOccurences
  ): IPieChartData[] => {
    const convertedData: IPieChartData[] = [];
    for (const [groupTopicName, topicOccurences] of Object.entries(
      occurences
    )) {
      convertedData.push({
        name: groupTopicName,
        value: Object.values(topicOccurences).reduce(
          (total, count) => total + count,
          0
        ),
      });
    }

    return convertedData;
  };

  return (
    <Box sx={{ m: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: 520, position: "relative" }}>
            <CustomPopover />
            <PieChart data={convertToPieChartData(groupedTopicOccurences)} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ height: 202 }}>
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
            <Paper sx={{ height: 302 }}>
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

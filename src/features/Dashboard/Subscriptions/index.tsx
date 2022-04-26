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
import TopicInfoCard from "features/Dashboard/Subscriptions/components/TopicInfoCard";
import { groupedIdMap, topicIdMap } from "./topicIdMap";
import { convertToPieChartData, convertToTopicData } from "./utils";
import { IGroupedOccurences } from "./types";
import TopicAccordion from "features/Dashboard/Subscriptions/components/TopicAccordion";

const Subscriptions = () => {
  const [groupedOccurences, setGroupedOccurences] =
    useState<IGroupedOccurences>({});

  // Gets users subscriptions on load
  useEffect(() => {
    let abortController = new AbortController();
    getSubscriptions(100).then((subscriptions) => {
      getChannels(subscriptions);
    });
    return () => abortController.abort();
  }, []);

  // Makes channels.list call with ids from subscriptions and processes the result
  const getChannels = (subs: Subscription[] | undefined): void => {
    if (subs === undefined) {
      return;
    }
    const subscriptionIds = subs
      .map((sub) => sub.snippet?.resourceId?.channelId)
      .filter((id): id is string => id !== undefined);

    getChannelByIds(subscriptionIds).then((channels) => {
      const occurences = getGroupedTopicOccurrences(channels);
      setGroupedOccurences(occurences);
    });
  };

  // Converts channels to group topic occurences state
  const getGroupedTopicOccurrences = (
    channels: Channel[] | undefined
  ): IGroupedOccurences => {
    if (channels === undefined) {
      return {};
    }
    const occurences: IGroupedOccurences = {
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

  return (
    <Box sx={{ m: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: 520, position: "relative", p: 3 }}>
            <CustomPopover />
            <PieChart data={convertToPieChartData(groupedOccurences)} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ height: 202 }}>
              <TopicInfoCard
                header="Most popular category"
                type="most"
                topicInfo={convertToTopicData(groupedOccurences, "most")}
              />
              <TopicInfoCard
                header="Least popular category"
                type="least"
                topicInfo={convertToTopicData(groupedOccurences, "least")}
              />
            </Stack>
            <Paper sx={{ height: 302 }}>
              <TopicAccordion groupedOccurences={groupedOccurences} />
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

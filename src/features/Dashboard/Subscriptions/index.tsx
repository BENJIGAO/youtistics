import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Subscription, Channel } from "@types";
import CustomPopover from "common/components/Popover";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import { getTotalFromObjValues } from "common/utils/generalUtils";
import ScatterChart from "features/Dashboard/Subscriptions/components/charts/ScatterChart";
import PieChart from "features/Dashboard/Subscriptions/components/charts/PieChart";
import CategoryInfoCard from "features/Dashboard/Subscriptions/components/CategoryInfoCard";
import TopicAccordion from "features/Dashboard/Subscriptions/components/CategoryAccordion";
import MadeForKidsCard from "features/Dashboard/Subscriptions/components/MadeForKidsCard";
import StatisticAveragesCard from "features/Dashboard/Subscriptions/components/StatisticAveragesCard";
import { groupedIdMap, topicIdMap } from "./topicIdMap";
import { IGroupedOccurences, ITopicOccurences } from "./types";
import { convertToPieChartData, convertToTopicData } from "./utils";

const Subscriptions = () => {
  const [madeForKidsRatio, setMadeForKidsRatio] = useState<[number, number]>([
    0, 0,
  ]);
  const [averageViewCount, setAverageViewCount] = useState<number>(0);
  const [averageSubscriberCount, setAverageSubscriberCount] =
    useState<number>(0);
  const [averageVideoCount, setAverageVideoCount] = useState<number>(0);
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
      processChannels(channels);
      console.log(channels);
    });
  };

  // Create initial Topic Object with keys as topic names and values starting at 0
  const createInitialTopicObject = (topicIdMap: Object): ITopicOccurences => {
    return Object.fromEntries(
      Object.values(topicIdMap).map((topicName) => [topicName, 0])
    );
  };

  /**
   * This function processes the channels array returned from the API response
   * to set the state of data that we are interested in. In our case, we want
   * the following information for each channel: whether it's made for kids, the
   * topic ids, the view/subscriber/video numbers, and the subscriber-view
   * relationship
   *
   * The extracting of info will happen in the order specified above. To be more specific:
   * SECTION 1: Made for kids
   * SECTION 3: View/subscriber/video calculations
   * SECTION 4: Subscriber-View Relationship
   * SECTION 2: Topic Ids
   */
  const processChannels = (channels: Channel[] | undefined): void => {
    if (channels === undefined) {
      return;
    }

    // SECTION 1
    let madeForKidsCount = 0;

    // SECTION 2
    let totalViews = 0;
    let totalSubscribers = 0;
    let totalVideos = 0;

    // SECTION 3

    // SECTION 4
    const occurences: IGroupedOccurences = {
      Music: createInitialTopicObject(groupedIdMap["Music"]),
      Gaming: createInitialTopicObject(groupedIdMap["Gaming"]),
      Sports: createInitialTopicObject(groupedIdMap["Sports"]),
      Entertainment: createInitialTopicObject(groupedIdMap["Entertainment"]),
      Lifestyle: createInitialTopicObject(groupedIdMap["Lifestyle"]),
      Society: createInitialTopicObject(groupedIdMap["Society"]),
      Other: createInitialTopicObject(groupedIdMap["Other"]),
    };

    channels.forEach((channel) => {
      // SECTION 1
      if (channel.status?.madeForKids === true) {
        madeForKidsCount++;
      }

      // SECTION 2
      if (channel.statistics?.viewCount !== undefined) {
        totalViews += Number(channel.statistics.viewCount);
      }
      if (channel.statistics?.subscriberCount !== undefined) {
        totalSubscribers += Number(channel.statistics.subscriberCount);
      }
      if (channel.statistics?.videoCount !== undefined) {
        totalVideos += Number(channel.statistics.videoCount);
      }

      // SECTION 3

      // SECTION 4
      const topicIds = channel.topicDetails?.topicIds ?? [];
      topicIds.forEach((topicId) => {
        // Loops through each of the categories to find a match
        for (const [groupName, idMap] of Object.entries(groupedIdMap)) {
          if (
            topicIdMap[topicId] !== undefined &&
            idMap[topicId] !== undefined &&
            occurences[groupName][topicIdMap[topicId]] !== undefined
          ) {
            occurences[groupName][topicIdMap[topicId]]++;
            break;
          }
        }
      });
    });

    // SECTION 1
    setMadeForKidsRatio([madeForKidsCount, channels.length]);

    // SECTION 2
    setAverageViewCount(Math.round(totalViews / channels.length));
    setAverageSubscriberCount(Math.round(totalSubscribers / channels.length));
    setAverageVideoCount(Math.round(totalVideos / channels.length));

    // SECTION 3

    // SECTION 4
    const sortedCategories = Object.fromEntries(
      Object.entries(occurences).sort(([, a], [, b]) => {
        return getTotalFromObjValues(b) - getTotalFromObjValues(a);
      })
    );

    const sortedCategoriesAndTopics = Object.fromEntries(
      Object.entries(sortedCategories).map(([categoryName, topicCounts]) => {
        return [
          categoryName,
          Object.fromEntries(
            Object.entries(topicCounts).sort(([, a], [, b]) => b - a)
          ),
        ];
      })
    );

    setGroupedOccurences(sortedCategoriesAndTopics);
  };

  return (
    <Box sx={{ m: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: 544, position: "relative", p: 3 }}>
            <CustomPopover />
            <PieChart data={convertToPieChartData(groupedOccurences)} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ height: 192 }}>
              <CategoryInfoCard
                header="Most popular category"
                type="most"
                topicInfo={convertToTopicData(groupedOccurences, "most")}
              />
              <CategoryInfoCard
                header="Least popular category"
                type="least"
                topicInfo={convertToTopicData(groupedOccurences, "least")}
              />
            </Stack>
            <Paper sx={{ height: 336 }}>
              <TopicAccordion groupedOccurences={groupedOccurences} />
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <MadeForKidsCard madeForKidsRatio={madeForKidsRatio} />
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <StatisticAveragesCard
            averageViewCount={averageViewCount}
            averageSubscriberCount={averageSubscriberCount}
            averageVideoCount={averageVideoCount}
          />
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
      </Grid>
    </Box>
  );
};

export default Subscriptions;

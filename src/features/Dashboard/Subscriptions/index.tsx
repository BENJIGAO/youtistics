import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import VideocamIcon from "@mui/icons-material/Videocam";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Subscription, Channel, IGroupedOccurences } from "@types";
import CustomPopover from "common/components/Popover";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import { getTotalFromObjValues, nFormatter } from "common/utils/generalUtils";
import { groupedIdMap, topicIdMap } from "features/Dashboard/topicIdMap";
import {
  convertToPieChartData,
  convertToTopicData,
  createInitialTopicObject,
} from "features/Dashboard/utils";
import ScatterChart from "features/Dashboard/components/charts/ScatterChart";
import PieChart from "features/Dashboard/components/charts/PieChart";
import CategoryAccordion from "features/Dashboard/components/SubsAndLikedVids/CategoryAccordion";
import CategoryInfoCard from "features/Dashboard/components/SubsAndLikedVids/CategoryInfoCard";
import MadeForKidsCard from "features/Dashboard/components/SubsAndLikedVids/MadeForKidsCard";
import StatisticAveragesCard from "features/Dashboard/components/SubsAndLikedVids/StatisticAveragesCard";
import FavouriteCard from "features/Dashboard/components/SubsAndLikedVids/FavouriteCard";

const Subscriptions = () => {
  const [madeForKidsRatio, setMadeForKidsRatio] = useState<[number, number]>([
    0, 0,
  ]);
  const [averageViewCount, setAverageViewCount] = useState<number>(0);
  const [averageSubscriberCount, setAverageSubscriberCount] =
    useState<number>(0);
  const [averageVideoCount, setAverageVideoCount] = useState<number>(0);
  // [subscriber count, view count, channel name]
  const [subscriberViewPairs, setSubscriberViewPairs] = useState<
    [number, number, string][]
  >([]);
  const [groupedOccurences, setGroupedOccurences] =
    useState<IGroupedOccurences>({});
  const [favouriteChannel, setFavouriteChannel] = useState<Channel>({});

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
    });
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
   * SECTION 2: View/subscriber/video calculations
   * SECTION 3: Subscriber-View Relationship
   * SECTION 4: Favourite Channel
   * SECTION 5: Topic Ids
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
    let subscriberViewPairs: [number, number, string][] = [];

    // SECTION 4
    let favouriteChannel: Channel = {};

    // SECTION 5
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
      if (
        channel.snippet?.title !== undefined &&
        channel.statistics?.viewCount !== undefined &&
        channel.statistics?.subscriberCount !== undefined
      ) {
        subscriberViewPairs.push([
          Number(channel.statistics.subscriberCount),
          Number(channel.statistics.viewCount),
          channel.snippet.title,
        ]);
      }

      // SECTION 4: TODO: Figure out favourite channel logic

      // SECTION 5
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
    setSubscriberViewPairs(subscriberViewPairs);

    // SECTION 4
    setFavouriteChannel(channels[0]);

    // SECTION 5
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
            <CustomPopover>
              <Typography sx={{ p: 2 }} variant="body2">
                For every channel that exists, Youtube associates certain topics
                with it (the list can be seen{" "}
                <Link
                  href="https://gist.github.com/stpe/2951130dfc8f1d0d1a2ad736bef3b703?permalink_comment_id=4128880#gistcomment-4128880"
                  target="_blank"
                  rel="noopener"
                >
                  here
                </Link>
                ). They categorize the type of content that the channel
                produces. Moreover, each topic falls under more general
                categories (e.g., Gaming, Sports, etc.,). This pie chart shows
                the distribution of these categories based on your most recent
                subscriptions.
              </Typography>
            </CustomPopover>
            <PieChart
              title="Subscription Topic Distribution"
              data={convertToPieChartData(groupedOccurences)}
            />
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
              <CategoryAccordion groupedOccurences={groupedOccurences} />
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <MadeForKidsCard madeForKidsRatio={madeForKidsRatio} />
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <StatisticAveragesCard
            statistic1={
              nFormatter(averageViewCount.toString(), 1) + " total views"
            }
            statistic2={
              nFormatter(averageSubscriberCount.toString(), 1) + " subscribers"
            }
            statistic3={
              nFormatter(averageVideoCount.toString(), 1) + " total videos"
            }
            icon1={<VisibilityIcon fontSize="large" color="primary" />}
            icon2={<PersonIcon fontSize="large" color="primary" />}
            icon3={<VideocamIcon fontSize="large" color="primary" />}
          />
        </Grid>
        <Grid item xs={12} lg={6} xl={6}>
          <Paper sx={{ height: 252, pt: 3 }}>
            <ScatterChart
              title="Subscribers vs Views"
              xLabel="Subscribers"
              yLabel="Views"
              data={subscriberViewPairs}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <FavouriteCard
            title={favouriteChannel.snippet?.title}
            imageURL={favouriteChannel.snippet?.thumbnails?.high?.url}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Subscriptions;

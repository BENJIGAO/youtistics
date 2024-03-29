import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IGroupedOccurences, Video } from "@types";
import CustomPopover from "common/components/Popover";
import { getLikedVideos } from "common/utils/apiUtils";
import {
  createObjFromObjValues,
  getTotalFromObjValues,
  nFormatter,
} from "common/utils/generalUtils";
import {
  convertToPieChartData,
  convertToTopicData,
  createInitialTopicObject,
} from "features/Dashboard/utils";
import { groupedIdMap, topicIdMap } from "features/Dashboard/topicIdMap";
import PieChart from "features/Dashboard/components/charts/PieChart";
import CategoryInfoCard from "features/Dashboard/components/SubsAndLikedVids/CategoryInfoCard";
import ScatterChart from "features/Dashboard/components/charts/ScatterChart";
import FavouriteCard from "features/Dashboard/components/SubsAndLikedVids/FavouriteCard";
import MadeForKidsCard from "features/Dashboard/components/SubsAndLikedVids/MadeForKidsCard";
import StatisticAveragesCard from "features/Dashboard/components/SubsAndLikedVids/StatisticAveragesCard";
import TopicAccordion from "features/Dashboard/components/SubsAndLikedVids/CategoryAccordion";

const LikedVideos = () => {
  const [madeForKidsRatio, setMadeForKidsRatio] = useState<[number, number]>([
    0, 0,
  ]);
  const [averageViewCount, setAverageViewCount] = useState<number>(0);
  const [averageLikeCount, setAverageLikeCount] = useState<number>(0);
  const [averageCommentCount, setAverageCommentCount] = useState<number>(0);
  // [subscriber count, view count, video name]
  const [subscriberViewPairs, setSubscriberViewPairs] = useState<
    [number, number, string][]
  >([]);
  const [groupedOccurences, setGroupedOccurences] =
    useState<IGroupedOccurences>({});
  const [favouriteVideo, setFavouriteVideo] = useState<Video>({});
  // Gets liked videos on load
  useEffect(() => {
    let abortController = new AbortController();
    getLikedVideos(100).then((likedVideos) => processLikedVideos(likedVideos));
    return () => abortController.abort();
  }, []);

  const processLikedVideos = (videos: Video[] | undefined): void => {
    if (videos === undefined) {
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
    let favouriteVideo: Video = {};

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

    videos.forEach((video) => {
      // SECTION 1
      if (video.status?.madeForKids === true) {
        madeForKidsCount++;
      }

      // SECTION 2
      if (video.statistics?.viewCount !== undefined) {
        totalViews += Number(video.statistics.viewCount);
      }
      if (video.statistics?.likeCount !== undefined) {
        totalSubscribers += Number(video.statistics.likeCount);
      }
      if (video.statistics?.commentCount !== undefined) {
        totalVideos += Number(video.statistics.commentCount);
      }

      // SECTION 3
      if (
        video.snippet?.title !== undefined &&
        video.statistics?.viewCount !== undefined &&
        video.statistics?.likeCount !== undefined
      ) {
        subscriberViewPairs.push([
          Number(video.statistics.viewCount),
          Number(video.statistics.likeCount),
          video.snippet.title,
        ]);
      }

      // SECTION 4: TODO: Figure out favourite video logic

      // SECTION 5
      const wikiURLs = video.topicDetails?.topicCategories ?? [];
      wikiURLs.forEach((wikiURL) => {
        const topicName = parseWikiURL(wikiURL);
        const topicNameMap = createObjFromObjValues(topicIdMap);
        // Loops through each of the categories to find a match
        for (const [groupName, idMap] of Object.entries(groupedIdMap)) {
          const categoryTopicNameMap = createObjFromObjValues(idMap);
          if (
            topicNameMap[topicName as keyof Object] !== undefined &&
            categoryTopicNameMap[topicName as keyof Object] !== undefined &&
            occurences[groupName][topicName] !== undefined
          ) {
            occurences[groupName][topicName]++;
            break;
          }
        }
      });
    });

    // SECTION 1
    setMadeForKidsRatio([madeForKidsCount, videos.length]);

    // SECTION 2
    setAverageViewCount(Math.round(totalViews / videos.length));
    setAverageLikeCount(Math.round(totalSubscribers / videos.length));
    setAverageCommentCount(Math.round(totalVideos / videos.length));

    // SECTION 3
    setSubscriberViewPairs(subscriberViewPairs);

    // SECTION 4
    setFavouriteVideo(videos[0]);

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

  // Parses the URL from video.topicDetails.topicCategories
  const parseWikiURL = (url: string): string => {
    // Gets the topic name and replaces underscores with a space
    return url.split("/").slice(-1)[0].replaceAll("_", " ");
  };

  return (
    <Box sx={{ m: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ height: 544, position: "relative", p: 3 }}>
            <CustomPopover>
              <Typography sx={{ p: 2 }} variant="body2">
                For every video that exists, Youtube categorizes and associates
                certain topics with it (the list can be seen{" "}
                <Link
                  href="https://gist.github.com/stpe/2951130dfc8f1d0d1a2ad736bef3b703?permalink_comment_id=4128880#gistcomment-4128880"
                  target="_blank"
                  rel="noopener"
                >
                  here
                </Link>
                ). Moreover, each topic falls under more general categories
                (e.g., Gaming, Sports, etc.,). This pie chart shows the
                distribution of these categories based on the videos you liked
                most recently.
              </Typography>
            </CustomPopover>
            <PieChart
              title="Video Topic Distribution"
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
              <TopicAccordion groupedOccurences={groupedOccurences} />
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <MadeForKidsCard madeForKidsRatio={madeForKidsRatio} />
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <StatisticAveragesCard
            statistic1={nFormatter(averageViewCount.toString(), 1) + " views"}
            statistic2={nFormatter(averageLikeCount.toString(), 1) + " likes"}
            statistic3={
              nFormatter(averageCommentCount.toString(), 1) + " comments"
            }
            icon1={<VisibilityIcon fontSize="large" color="primary" />}
            icon2={<ThumbUpIcon fontSize="large" color="primary" />}
            icon3={<MessageIcon fontSize="large" color="primary" />}
          />
        </Grid>
        <Grid item xs={12} lg={6} xl={6}>
          <Paper sx={{ height: 252, pt: 3 }}>
            <ScatterChart
              title="Views vs Likes"
              xLabel="Views"
              yLabel="Likes"
              data={subscriberViewPairs}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6} xl={2}>
          <FavouriteCard
            title={favouriteVideo.snippet?.title}
            imageURL={favouriteVideo.snippet?.thumbnails?.high?.url}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LikedVideos;

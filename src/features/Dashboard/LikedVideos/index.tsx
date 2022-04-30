import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IGroupedOccurences, Video } from "@types";
import { getLikedVideos } from "common/utils/apiUtils";
import { createInitialTopicObject } from "../utils";
import { groupedIdMap, topicIdMap } from "../topicIdMap";
import { getTotalFromObjValues } from "common/utils/generalUtils";

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

    console.log(videos);
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
      const topicIds = video.topicDetails?.relevantTopicIds ?? [];
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
  return (
    <Box>
      <Typography>Liked Videos</Typography>
    </Box>
  );
};

export default LikedVideos;

import { useEffect, useState, memo } from "react";
import { SwiperSlide } from "swiper/react";
import Typography from "@mui/material/Typography";
import { Video } from "@types";
import { getLikedVideos } from "common/utils/apiUtils";
import SwiperWrapper from "./SwiperWrapper";
import CardWrapper from "./CardWrapper";

const RecentLikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);

  // Gets liked videos on load
  useEffect(() => {
    let abortController = new AbortController();
    getLikedVideos(15).then((likedVideos) => setLikedVideos(likedVideos ?? []));
    return () => abortController.abort();
  }, []);

  return (
    <SwiperWrapper dataArray={likedVideos}>
      {likedVideos.map((likedVideo, index) => {
        return (
          <SwiperSlide key={index} virtualIndex={index}>
            <CardWrapper
              TitleNode={
                <Typography
                  sx={{ fontSize: "subtitle1.fontSize" }}
                  gutterBottom
                  component="div"
                >
                  {likedVideo.snippet?.title}
                </Typography>
              }
              title={likedVideo.snippet?.title}
              description={likedVideo.snippet?.description}
              imageUrl={likedVideo.snippet?.thumbnails?.high?.url}
              statistics={[
                {
                  label: "View Count",
                  value: likedVideo.statistics?.viewCount,
                },
                {
                  label: "Like Count",
                  value: likedVideo.statistics?.likeCount,
                },
                {
                  label: "Comment Count",
                  value: likedVideo.statistics?.commentCount,
                },
              ]}
            />
          </SwiperSlide>
        );
      })}
    </SwiperWrapper>
  );
};

export default memo(RecentLikedVideos);

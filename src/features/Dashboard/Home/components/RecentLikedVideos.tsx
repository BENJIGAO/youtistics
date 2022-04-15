import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Video } from "@types";
import { getLikedVideos } from "common/utils/apiUtils";
import LikedVideoCard from "features/Dashboard/Home/components/LikedVideoCard";
import SwiperWrapper from "./SwiperWrapper";

const RecentLikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);

  // Gets liked videos on load
  useEffect(() => {
    getLikedVideos(15).then((likedVideos) => setLikedVideos(likedVideos ?? []));
  }, []);

  return (
    <SwiperWrapper dataArray={likedVideos}>
      {likedVideos.map((likedVideo, index) => {
        return (
          <SwiperSlide key={index}>
            <LikedVideoCard
              videoTitle={likedVideo.snippet?.title}
              videoDescription={likedVideo.snippet?.description}
              videoImageUrl={likedVideo.snippet?.thumbnails?.high?.url}
              videoStats={likedVideo.statistics}
            />
          </SwiperSlide>
        );
      })}
    </SwiperWrapper>
  );
};

export default RecentLikedVideos;

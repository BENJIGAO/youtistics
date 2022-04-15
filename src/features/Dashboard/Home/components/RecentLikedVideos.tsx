import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Video } from "@types";
import { getLikedVideos } from "common/utils/apiUtils";
import LikedVideoCard from "features/Dashboard/Home/components/LikedVideoCard";

const RecentLikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);

  // Gets users subscriptions on load
  useEffect(() => {
    getLikedVideos(15).then((likedVideos) => setLikedVideos(likedVideos ?? []));
  }, []);

  return (
    <Grid item xs={12} sx={{ m: 0, pr: 5 }}>
      {likedVideos !== [] ? (
        <Swiper
          style={{ position: "relative" }}
          modules={[Navigation]}
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
            1536: { slidesPerView: 5 },
          }}
          simulateTouch={false}
          navigation={{ nextEl: ".next", prevEl: ".prev" }}
        >
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
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 10,
              bottom: "45%",
              right: 0,
            }}
            className="next"
          >
            <NavigateNextIcon sx={{ fontSize: 50 }} color="primary" />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 10,
              bottom: "45%",
              left: 0,
            }}
            className="prev"
          >
            <NavigateBeforeIcon sx={{ fontSize: 50 }} color="primary" />
          </IconButton>
        </Swiper>
      ) : (
        <Skeleton variant="rectangular" height={300} />
      )}
    </Grid>
  );
};

export default RecentLikedVideos;

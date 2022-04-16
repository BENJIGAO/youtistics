import React from "react";
import { Navigation, Virtual } from "swiper";
import { Swiper } from "swiper/react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Subscription, Video } from "@types";

interface ISwiperWrapperProps {
  dataArray: Subscription[] | Video[];
  children: React.ReactNode[];
}

const SwiperWrapper = ({ dataArray, children }: ISwiperWrapperProps) => {
  return (
    <Grid item xs={12} sx={{ m: 0 }}>
      {dataArray !== [] ? (
        <Swiper
          style={{ position: "relative" }}
          modules={[Navigation, Virtual]}
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
          virtual
        >
          {children}
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

export default SwiperWrapper;

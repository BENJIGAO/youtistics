import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Subscription, ChannelStatistics, Channel } from "@types";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import SubscriptionCard from "features/Dashboard/Home/components/SubscriptionCard";

const RecentSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [channelStats, setChannelStats] = useState<ChannelStatistics[]>([]);

  // Gets users subscriptions on load
  useEffect(() => {
    getSubscriptions(15).then((subscriptions) =>
      setSubscriptions(subscriptions ?? [])
    );
  }, []);

  // Set channelStats when subscriptions is populated because it needs it for sorting as a reference array
  useEffect(() => {
    setChannelStatsWithSubscriptions(subscriptions);
  }, [subscriptions]);

  const setChannelStatsWithSubscriptions = (
    subs: Subscription[] | undefined
  ): void => {
    if (subs === undefined) {
      return;
    }
    const subscriptionIds = subs
      .map((sub) => sub.snippet?.resourceId?.channelId)
      .filter((id): id is string => id !== undefined);

    getChannelByIds(subscriptionIds).then((channels) =>
      sortAndSetChannelStats(channels)
    );
  };

  const sortAndSetChannelStats = (channels: Channel[] | undefined) => {
    if (channels === undefined) {
      return;
    }
    const refArr = subscriptions
      .map((channel) => channel.snippet?.title)
      .filter((title): title is string => title !== undefined);

    const sortedChannels: Channel[] = channels.slice().sort((a, b) => {
      return (
        refArr.indexOf(a.snippet?.localized?.title || "") -
        refArr.indexOf(b.snippet?.localized?.title || "")
      );
    });

    const sortedStatistics = sortedChannels
      .map((channel) => channel.statistics)
      .filter((stats): stats is ChannelStatistics => stats !== undefined);

    setChannelStats(sortedStatistics);
  };
  return (
    <Grid item xs={12} sx={{ m: 0, pr: 5 }}>
      {subscriptions !== [] ? (
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
          {subscriptions.map((sub, index) => {
            return (
              <SwiperSlide key={index}>
                <SubscriptionCard
                  channelTitle={sub.snippet?.title}
                  channelDescription={sub.snippet?.description}
                  channelImageUrl={sub.snippet?.thumbnails?.high?.url}
                  channelStats={channelStats[index]}
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

export default RecentSubscriptions;

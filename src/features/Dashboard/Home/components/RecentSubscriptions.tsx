import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Typography from "@mui/material/Typography";
import { Subscription, ChannelStatistics, Channel } from "@types";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import SwiperWrapper from "./SwiperWrapper";
import CardWrapper from "./CardWrapper";

const RecentSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [channelStats, setChannelStats] = useState<ChannelStatistics[]>([]);

  // Gets users subscriptions on load
  useEffect(() => {
    let abortController = new AbortController();
    getSubscriptions(15).then((subscriptions) =>
      setSubscriptions(subscriptions ?? [])
    );
    return () => abortController.abort();
  }, []);

  // Set channelStats when subscriptions is populated because it needs it for sorting as a reference array
  useEffect(() => {
    let abortController = new AbortController();
    setChannelStatsWithSubscriptions(subscriptions);
    return () => abortController.abort();
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
    <SwiperWrapper dataArray={subscriptions}>
      {subscriptions.map((sub, index) => {
        return (
          <SwiperSlide key={index}>
            <CardWrapper
              TitleNode={
                <Typography gutterBottom variant="h5" component="div">
                  {sub.snippet?.title}
                </Typography>
              }
              title={sub.snippet?.title}
              description={sub.snippet?.description}
              imageUrl={sub.snippet?.thumbnails?.high?.url}
              statistics={[
                {
                  label: "View Count",
                  value: channelStats[index]
                    ? channelStats[index].viewCount
                    : undefined,
                },
                {
                  label: "Subscriber Count",
                  value: channelStats[index]
                    ? channelStats[index].subscriberCount
                    : undefined,
                },
                {
                  label: "Video Count",
                  value: channelStats[index]
                    ? channelStats[index].videoCount
                    : undefined,
                },
              ]}
            />
          </SwiperSlide>
        );
      })}
    </SwiperWrapper>
  );
};

export default RecentSubscriptions;

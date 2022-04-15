import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Subscription, ChannelStatistics, Channel } from "@types";
import { getSubscriptions, getChannelByIds } from "common/utils/apiUtils";
import SubscriptionCard from "features/Dashboard/Home/components/SubscriptionCard";
import SwiperWrapper from "./SwiperWrapper";

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
    <SwiperWrapper dataArray={subscriptions}>
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
    </SwiperWrapper>
  );
};

export default RecentSubscriptions;

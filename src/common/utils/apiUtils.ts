import { Subscription, Channel, Video } from "@types";

interface ICache {
  [key: string]: Subscription[] | Channel[] | Video[];
}

interface IParams {
  [key: string]: string | string[];
}

/**
 * The format of the cache key will be the following:
 * <resource_type>.<method>?<dynamic_param_1>=<dynamic_param_1_value>...<dynamic_param_x>=<dynamic_param_x_value>
 * where the params are in the same order for each method of a specific resource type.
 *
 * Here's an example key using the Youtube Data API's channels.list method with a dynamic params of ids:
 * "channels.list?ids=123,456,789"
 * where 123, 456, and 789 are ids of channels that I want to query.
 *
 * This allows duplicate methods with the parameters to be served through the cache rather than making an duplicate API request
 */
const cache: ICache = {};

export const getSubscriptions = async (maxResults: number) => {
  const SUBSCRIPTIONS_LIST_KEY = getUniqueKey("subscriptions", "list", {
    maxResults: maxResults.toString(),
  });
  if (cache[SUBSCRIPTIONS_LIST_KEY] !== undefined) {
    return cache[SUBSCRIPTIONS_LIST_KEY] as unknown as Subscription[];
  }
  try {
    const response = await window.gapi.client.youtube.subscriptions.list({
      part: "snippet",
      mine: true,
      maxResults: maxResults,
    });
    if (response.result.items !== undefined) {
      cache[SUBSCRIPTIONS_LIST_KEY] = response.result.items;
    }
    return response.result.items;
  } catch (err) {
    console.log(err);
  }
};

export const getChannelByIds = async (ids: string | string[]) => {
  const CHANNELS_LIST_KEY = getUniqueKey("channels", "list", {
    id: ids,
  });
  if (cache[CHANNELS_LIST_KEY] !== undefined) {
    return cache[CHANNELS_LIST_KEY] as unknown as Channel[];
  }
  try {
    const response = await window.gapi.client.youtube.channels.list({
      part: "snippet,statistics,topicDetails,status",
      id: ids,
    });
    if (response.result.items !== undefined) {
      cache[CHANNELS_LIST_KEY] = response.result.items;
    }
    return response.result.items;
  } catch (err) {
    console.log(err);
  }
};

export const getLikedVideos = async (maxResults: number) => {
  const VIDEOS_LIST_KEY = getUniqueKey("videos", "list", {
    maxResults: maxResults.toString(),
  });
  if (cache[VIDEOS_LIST_KEY] !== undefined) {
    return cache[VIDEOS_LIST_KEY] as unknown as Video[];
  }
  try {
    const response = await window.gapi.client.youtube.videos.list({
      part: "snippet,statistics,topicDetails,status",
      myRating: "like",
      maxResults: maxResults,
    });
    if (response.result.items !== undefined) {
      cache[VIDEOS_LIST_KEY] = response.result.items;
    }
    return response.result.items;
  } catch (err) {
    console.log(err);
  }
};

const getUniqueKey = (
  resource: string,
  method: "list",
  params: IParams
): string => {
  let formattedParams: string = "";
  for (const [key, value] of Object.entries(params)) {
    formattedParams +=
      key + "=" + (typeof value === "string" ? value : value.join(","));
  }
  return resource + "." + method + "?" + formattedParams;
};

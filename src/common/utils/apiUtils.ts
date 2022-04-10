import { Subscription, Channel } from "@types";

interface ICache {
  [key: string]: Subscription[] | Channel[];
}

/**
 * The format of the cache key will be the following:
 * <resource_type>.<method>?<dynamic_param_1>=<dynamic_param_1_value>...<dynamic_param_1>=<dynamic_param_1_value>
 * where the params are in the same order for each method of a specific resource type.
 *
 * Here's an example key using the Youtube Data API's channels.list method with a dynamic params of ids:
 * "channels.list?ids=123,456,789"
 * where 123, 456, and 789 are ids of channels that I want to query.
 *
 * This allows duplicate methods with the parameters to be served through the cache rather than making an duplicate API request
 */
const cache: ICache = {};

export const getSubscriptions = async () => {
  const SUBSCRIPTIONS_LIST_KEY = "subscriptions.list";
  if (cache[SUBSCRIPTIONS_LIST_KEY] !== undefined) {
    return cache[SUBSCRIPTIONS_LIST_KEY];
  }
  try {
    const response = await window.gapi.client.youtube.subscriptions.list({
      part: "snippet",
      mine: true,
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
  const CHANNELS_LIST_KEY = "channels.list";
  if (cache[CHANNELS_LIST_KEY] !== undefined) {
    return cache[CHANNELS_LIST_KEY];
  }
  try {
    const response = await window.gapi.client.youtube.channels.list({
      part: "snippet,statistics",
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

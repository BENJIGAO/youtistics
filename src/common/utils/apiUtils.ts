import { Subscription, Channel } from "@types";

interface ICache {
  [key: string]: Subscription[] | Channel[];
}

interface IParams {
  [key: string]: string | string[];
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

export const getSubscriptions = async (maxResults: number) => {
  const SUBSCRIPTIONS_LIST_KEY = getUniqueKey("subscriptions", "list", {
    maxResults: maxResults.toString(),
  });
  if (cache[SUBSCRIPTIONS_LIST_KEY] !== undefined) {
    return cache[SUBSCRIPTIONS_LIST_KEY];
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

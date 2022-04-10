export const getSubscriptions = async () => {
  return window.gapi.client.youtube.subscriptions.list({
    part: "snippet",
    mine: true,
  });
};

export const getChannelByIds = async (ids: string | string[]) => {
  return window.gapi.client.youtube.channels.list({
    part: "snippet,statistics",
    id: ids,
  });
};

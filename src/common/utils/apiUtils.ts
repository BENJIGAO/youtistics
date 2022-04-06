export const getSubscriptions = async () => {
  return window.gapi.client.youtube.subscriptions.list({
    part: "snippet",
    mine: true,
  });
};

export const getChannelById = async (ids: string) => {
  return window.gapi.client.youtube.channels.list({
    part: "statistics",
    id: ids,
  });
};

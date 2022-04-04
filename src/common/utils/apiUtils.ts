export const getSubscriptions = async () => {
  return window.gapi.client.youtube.subscriptions.list({
    part: "snippet",
    mine: true,
  });
};

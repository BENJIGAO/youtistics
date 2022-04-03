export const getSubscriptions = async () => {
  // @ts-ignore
  return window.gapi.client.youtube.subscriptions.list({
    part: "snippet",
    mine: "true",
  });
};

export const getSubscriptions = async () => {
  // @ts-expect-error
  return window.gapi.client.youtube.subscriptions.list({
    part: "snippet",
    mine: "true",
  });
};

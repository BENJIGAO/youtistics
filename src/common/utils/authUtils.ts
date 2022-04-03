// REFS: https://developers.google.com/identity/oauth2/web/guides/use-token-model
// REFS: https://github.com/google/google-api-javascript-client
import { history } from "app/app";

// TODO: find @types package for google.accounts.oauth2.initTokenClient
// @ts-ignore
let tokenClient;
let accessToken;

export const loadScript = (src: string, onload: () => void): void => {
  const isScriptLoaded = document.querySelector(`script[src='${src}']`)
    ? true
    : false;
  if (isScriptLoaded) {
    return;
  }

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onload = onload;

  document.head.appendChild(script);
};

const gapiStart = (): void => {
  window.gapi.client
    .init({})
    .then(() => {
      window.gapi.client.load("youtube", "v3");
    })
    .then((response) => {
      console.log("discovery document loaded");
    })
    .catch((reason) => {
      console.log("Error: " + reason.result.error.message);
    });
};

export const gapiLoad = (): void => {
  window.gapi.load("client", gapiStart);
};

export const gisInit = (): void => {
  // @ts-ignore
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id:
      "181813367814-77g0b6tv1u34i8na7j0857erjokvvamo.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/youtube.readonly",
    // @ts-ignore
    callback: (tokenResponse) => {
      accessToken = tokenResponse.access_token;
      console.log(
        "gapi.client access token: " + JSON.stringify(gapi.client.getToken())
      );
      history.push("/dashboard");
    },
  });
};

export const getToken = (): void => {
  // @ts-ignore
  tokenClient.requestAccessToken();
};

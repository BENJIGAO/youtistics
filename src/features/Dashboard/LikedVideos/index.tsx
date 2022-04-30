import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Video } from "@types";
import { getLikedVideos } from "common/utils/apiUtils";

const LikedVideos = () => {
  // Gets liked videos on load
  useEffect(() => {
    let abortController = new AbortController();
    getLikedVideos(100).then((likedVideos) => processLikedVideos(likedVideos));
    return () => abortController.abort();
  }, []);

  const processLikedVideos = (videos: Video[] | undefined): void => {
    if (videos === undefined) {
      return;
    }
    console.log(videos);
  };
  return (
    <Box>
      <Typography>Liked Videos</Typography>
    </Box>
  );
};

export default LikedVideos;

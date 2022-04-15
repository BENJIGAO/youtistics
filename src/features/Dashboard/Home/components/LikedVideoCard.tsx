import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { VideoStatistics } from "@types";
import ImageNotFound from "assets/ImageNotFound.jpg";
import OverlayScrollbar from "common/components/OverlayScrollbar";
import { nFormatter } from "common/utils/generalUtils";

const CustomCard = styled(Card)(() => ({
  height: 320,
}));

interface ISubscriptionCard {
  videoTitle?: string;
  videoDescription?: string;
  videoImageUrl?: string;
  videoStats?: VideoStatistics;
}

const LikedVideoCard = ({
  videoTitle,
  videoDescription,
  videoImageUrl,
  videoStats,
}: ISubscriptionCard) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Tooltip title={videoTitle ?? "Loading..."} placement="bottom">
        <CustomCard key="front" sx={{ position: "relative" }}>
          <CardMedia
            sx={{ maxHeight: 200 }}
            component="img"
            image={videoImageUrl}
            alt={videoTitle}
            onError={(e: any) => (e.target.value = ImageNotFound)}
          />
          <CardContent>
            <Typography
              sx={{ fontSize: "subtitle1.fontSize" }}
              gutterBottom
              component="div"
            >
              {videoTitle}
            </Typography>
          </CardContent>
          <CardActions sx={{ position: "absolute", bottom: 4, left: 4 }}>
            <Button
              sx={{
                "&:hover": {
                  opacity: "100%",
                  backgroundColor: "grey.50",
                },
                opacity: "50%",
                boxShadow: 3,
              }}
              variant="outlined"
              onClick={() => setIsFlipped(!isFlipped)}
              size="small"
            >
              Learn More
            </Button>
          </CardActions>
        </CustomCard>
      </Tooltip>
      <Tooltip title={videoTitle ?? "Loading..."} placement="bottom">
        <CustomCard key="back">
          <CardActions sx={{ pb: 0 }}>
            <IconButton onClick={() => setIsFlipped(!isFlipped)}>
              <ArrowBackIosNewIcon fontSize="small" color="primary" />
            </IconButton>
          </CardActions>
          <CardContent sx={{ py: 0, height: "80%" }}>
            <OverlayScrollbar>
              <Box sx={{ pr: 2 }}>
                <Typography variant="h6" component="h4">
                  Statistics
                </Typography>
                <Typography>
                  View Count: {nFormatter(videoStats?.viewCount, 1)}
                </Typography>
                <Typography>
                  Liked Count: {nFormatter(videoStats?.likeCount, 1)}
                </Typography>
                <Typography>
                  Comment Count: {nFormatter(videoStats?.commentCount, 1)}
                </Typography>
                <Typography variant="h6" component="h6">
                  Description
                </Typography>
                <Typography>
                  {videoDescription !== "" ? videoDescription : "N/A"}
                </Typography>
              </Box>
            </OverlayScrollbar>
          </CardContent>
        </CustomCard>
      </Tooltip>
    </ReactCardFlip>
  );
};

export default LikedVideoCard;

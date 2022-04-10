import { useEffect, useState } from "react";
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
import { ChannelStatistics } from "@types";
import ImageNotFound from "assets/ImageNotFound.jpg";
import OverlayScrollbar from "common/components/OverlayScrollbar";
import { getChannelById } from "common/utils/apiUtils";
import { nFormatter } from "common/utils/generalUtils";

const CustomCard = styled(Card)(() => ({
  height: 320,
}));

interface ISubscriptionCard {
  channelId?: string;
  channelTitle?: string;
  channelDescription?: string;
  channelImageUrl?: string;
}

const SubscriptionCard = ({
  channelId,
  channelTitle,
  channelDescription,
  channelImageUrl,
}: ISubscriptionCard) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [channelStatistics, setChannelStatistics] = useState<ChannelStatistics>(
    {}
  );

  console.log(channelStatistics);

  // will refactor to include the channel statistic fetching logic in the parent component
  useEffect(() => {
    if (channelId !== undefined) {
      getChannelById(channelId)
        .then((res) => {
          if (res.result.items !== undefined && res.result.items.length > 0) {
            setChannelStatistics(res.result.items[0]?.statistics ?? {});
          }
        })
        .catch((err) => console.log(err));
    }
  }, [channelId]);

  const tempNFormatter = (num: string) => {
    return nFormatter(parseFloat(num), 1);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Tooltip title={channelTitle ?? "Loading..."} placement="bottom">
        <CustomCard key="front">
          <CardMedia
            sx={{ maxHeight: 200 }}
            component="img"
            image={channelImageUrl}
            alt={channelTitle}
            onError={(e: any) => (e.target.value = ImageNotFound)}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {channelTitle}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => setIsFlipped(!isFlipped)} size="small">
              Learn More
            </Button>
          </CardActions>
        </CustomCard>
      </Tooltip>
      <Tooltip title={channelTitle ?? "Loading..."} placement="bottom">
        <CustomCard key="back">
          <CardActions sx={{ pb: 0 }}>
            <IconButton onClick={() => setIsFlipped(!isFlipped)}>
              <ArrowBackIosNewIcon fontSize="small" color="primary" />
            </IconButton>
          </CardActions>
          <CardContent sx={{ py: 0, height: "90%" }}>
            <OverlayScrollbar>
              <Box sx={{ pr: 2 }}>
                <Typography variant="h6" component="h4">
                  Statistics
                </Typography>
                <Typography>
                  View Count:{" "}
                  {channelStatistics.viewCount
                    ? tempNFormatter(channelStatistics.viewCount)
                    : "ERROR"}
                </Typography>
                <Typography>
                  Subscriber Count:{" "}
                  {channelStatistics.subscriberCount
                    ? tempNFormatter(channelStatistics.subscriberCount)
                    : "ERROR"}
                </Typography>
                <Typography>
                  Video Count:{" "}
                  {channelStatistics.videoCount
                    ? tempNFormatter(channelStatistics.videoCount)
                    : "ERROR"}
                </Typography>
                <Typography variant="h6" component="h6">
                  Description
                </Typography>
                <Typography>{channelDescription}</Typography>
              </Box>
            </OverlayScrollbar>
          </CardContent>
        </CustomCard>
      </Tooltip>
    </ReactCardFlip>
  );
};

export default SubscriptionCard;

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReactCardFlip from "react-card-flip";
import { ChannelStatistics } from "@types";
import ImageNotFound from "assets/ImageNotFound.jpg";
import { getChannelById } from "common/utils/apiUtils";

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
          <CardContent sx={{ py: 0 }}>
            <Typography variant="h6" component="h4">
              Statistics
            </Typography>
            <Typography>
              Subscriber Count: {channelStatistics.subscriberCount}
            </Typography>
            <Typography>Video Count: {channelStatistics.videoCount}</Typography>
            <Typography>View Count: {channelStatistics.viewCount}</Typography>
            <Typography variant="h6" component="h6">
              Description
            </Typography>
            <Typography>{channelDescription}</Typography>
          </CardContent>
        </CustomCard>
      </Tooltip>
    </ReactCardFlip>
  );
};

export default SubscriptionCard;

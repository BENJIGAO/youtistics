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
import { Channel } from "@types";
import { getChannelById } from "common/utils/apiUtils";

const CustomCard = styled(Card)(() => ({
  minHeight: 300,
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
  const [channelStatistics, setChannelStatistics] = useState<Channel>({});

  useEffect(() => {
    if (channelId !== undefined) {
      console.log(channelId);
      getChannelById(channelId)
        .then((res) => console.log(res))
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
          <CardActions>
            <IconButton onClick={() => setIsFlipped(!isFlipped)}>
              <ArrowBackIosNewIcon fontSize="small" color="primary" />
            </IconButton>
          </CardActions>
          <CardContent>
            <Typography variant="h6" component="h4">
              Statistics
            </Typography>
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

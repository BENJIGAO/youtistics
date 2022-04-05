import { useState } from "react";
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
  return (
    <Tooltip title={channelTitle ?? "Loading..."} placement="bottom">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
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
      </ReactCardFlip>
    </Tooltip>
  );
};

export default SubscriptionCard;

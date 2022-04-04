import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ISubscriptionCard {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const SubscriptionCard = ({
  title,
  description,
  imageUrl,
}: ISubscriptionCard) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ maxHeight: 200 }}
        component="img"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default SubscriptionCard;

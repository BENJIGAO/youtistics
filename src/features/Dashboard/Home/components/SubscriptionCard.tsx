import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomCard = styled(Card)(({ theme }) => ({
  "&:hover": { boxShadow: theme.shadows[12] },
}));

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
    <Tooltip title={title ?? "Loading..."} placement="bottom">
      <CustomCard onClick={() => console.log("hello")}>
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
          <Button size="small">Learn More</Button>
        </CardActions>
      </CustomCard>
    </Tooltip>
  );
};

export default SubscriptionCard;

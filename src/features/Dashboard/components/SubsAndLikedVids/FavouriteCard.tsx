import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ImageNotFound from "assets/ImageNotFound.jpg";

interface IMediaCardProps {
  title: string | undefined;
  imageURL: string | undefined;
}

const FavouriteCard = ({ title, imageURL }: IMediaCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Card sx={{ height: 252, position: "relative" }}>
      <CardMedia
        sx={{ maxHeight: 120 }}
        component="img"
        image={imageURL}
        alt="favourite channel"
        onError={(e: any) => (e.target.value = ImageNotFound)}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          fontWeight="bold"
          component="div"
        >
          {title} is your favourite channel!
        </Typography>
      </CardContent>
      <CardActions sx={{ position: "absolute", bottom: 4, left: 4 }}>
        <Button onClick={() => setIsModalOpen(true)} size="small">
          Learn how we calculated this
        </Button>
      </CardActions>
      <FavouriteChannelModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </Card>
  );
};

interface IFavouriteChannelModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FavouriteChannelModal = ({
  isModalOpen,
  closeModal,
}: IFavouriteChannelModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          How Your Favourite Channel was Calculated
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          For now, we simply chose a random channel that you subscribed to. In
          the future, this will be computed rather than randomly selected.
        </Typography>
      </Box>
    </Modal>
  );
};

export default FavouriteCard;

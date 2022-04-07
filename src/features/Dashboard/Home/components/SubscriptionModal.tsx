import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

interface ISubscriptionModalProps {
  channelDescription: string;
  isModalOpen: boolean;
  setIsModalOpen: (newState: boolean) => void;
}

const SubscriptionModal = ({
  channelDescription,
  isModalOpen,
  setIsModalOpen,
}: ISubscriptionModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description">
          {channelDescription}
        </Typography>
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;

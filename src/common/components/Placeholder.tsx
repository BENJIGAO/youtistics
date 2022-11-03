import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

interface IPlaceholderProps {
  text: string;
}

const Placeholder = ({ text }: IPlaceholderProps) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography component="h3" variant="h5">
        {text}
      </Typography>
    </Box>
  );
};

export default Placeholder;

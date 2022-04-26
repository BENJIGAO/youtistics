import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import OverlayScrollbar from "common/components/OverlayScrollbar";

interface ITopicInfoCardProps {
  header: string;
  topicName: string;
  percentage: string;
  subTopicName: string;
  type: "most" | "least";
}

const TopicInfoCard = ({
  header,
  topicName,
  percentage,
  subTopicName,
  type,
}: ITopicInfoCardProps) => {
  return (
    <Paper sx={{ width: "50%", p: 3 }}>
      <OverlayScrollbar>
        <Typography variant="h6">{header}</Typography>
        <Typography
          variant="h3"
          color={type === "most" ? "primary" : "secondary"}
        >
          {percentage}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {topicName}. Within {topicName.toLowerCase()},{" "}
          <Box component="span" fontWeight="bold">
            {subTopicName}
          </Box>{" "}
          is the {type === "most" ? "most" : "least"} occuring topic
        </Typography>
      </OverlayScrollbar>
    </Paper>
  );
};

export default TopicInfoCard;

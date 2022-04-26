import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import OverlayScrollbar from "common/components/OverlayScrollbar";
import { ITopicInfo } from "features/Dashboard/Subscriptions/types";

interface ITopicInfoCardProps {
  header: string;
  type: "most" | "least";
  topicInfo: ITopicInfo;
}

const TopicInfoCard = ({ header, type, topicInfo }: ITopicInfoCardProps) => {
  return (
    <Paper sx={{ width: "50%", p: 3 }}>
      <OverlayScrollbar>
        <Typography variant="h6">{header}</Typography>
        <Typography
          variant="h3"
          color={type === "most" ? "primary" : "secondary"}
        >
          {topicInfo.percentage}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {topicInfo.categoryName}. Within{" "}
          {topicInfo.categoryName.toLowerCase()},{" "}
          <Box component="span" fontWeight="bold">
            {topicInfo.topicName}
          </Box>{" "}
          is the {type === "most" ? "most" : "least"} occuring topic
        </Typography>
      </OverlayScrollbar>
    </Paper>
  );
};

export default TopicInfoCard;

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import OverlayScrollbar from "common/components/OverlayScrollbar";
import { ITopicInfo } from "features/Dashboard/Subscriptions/types";

interface ICategoryInfoCardProps {
  header: string;
  type: "most" | "least";
  topicInfo: ITopicInfo;
}

const CategoryInfoCard = ({
  header,
  type,
  topicInfo,
}: ICategoryInfoCardProps) => {
  return (
    <Paper sx={{ width: "calc(50% - 8px)", p: 3 }}>
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

export default CategoryInfoCard;

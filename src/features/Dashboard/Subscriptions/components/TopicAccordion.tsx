import { useMemo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OverlayScrollbar from "common/components/OverlayScrollbar";
import { IGroupedOccurences } from "features/Dashboard/Subscriptions/types";
import TopicAccordionTable from "./TopicAccordionTable";

interface ITopicAccordionProps {
  groupedOccurences: IGroupedOccurences;
}

const TopicAccordion = ({ groupedOccurences }: ITopicAccordionProps) => {
  // gets total count of categories and memoizes it
  const memoizedTotal = useMemo(() => {
    return Object.values(groupedOccurences).reduce((totalCount, category) => {
      return (
        totalCount +
        Object.values(category).reduce((total, count) => total + count, 0)
      );
    }, 0);
  }, [groupedOccurences]);

  return (
    <OverlayScrollbar>
      {Object.keys(groupedOccurences).map((categoryName) => {
        return (
          <Accordion key={categoryName}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{categoryName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TopicAccordionTable
                topicCounts={groupedOccurences[categoryName]}
                totalCount={memoizedTotal}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </OverlayScrollbar>
  );
};

export default TopicAccordion;

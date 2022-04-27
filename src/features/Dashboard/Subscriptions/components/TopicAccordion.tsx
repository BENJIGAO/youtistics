import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OverlayScrollbar from "common/components/OverlayScrollbar";
import { IGroupedOccurences } from "features/Dashboard/Subscriptions/types";
import TopicAccordionTable from "./TopicAccordionTable";
import { Box } from "@mui/system";

interface ITopicAccordionProps {
  groupedOccurences: IGroupedOccurences;
}

const TopicAccordion = ({ groupedOccurences }: ITopicAccordionProps) => {
  console.log(groupedOccurences);
  return (
    <OverlayScrollbar>
      {Object.keys(groupedOccurences).map((categoryName) => {
        return (
          <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{categoryName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TopicAccordionTable />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </OverlayScrollbar>
  );
};

export default TopicAccordion;

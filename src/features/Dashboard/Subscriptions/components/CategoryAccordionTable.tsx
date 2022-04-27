import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITopicOccurences } from "features/Dashboard/Subscriptions/types";

interface ITopicAccordionTableProps {
  totalCount: number;
  topicCounts: ITopicOccurences;
}

const TopicAccordionTable = ({
  totalCount,
  topicCounts,
}: ITopicAccordionTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Topic Name</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Percentage (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(topicCounts).map(([topicName, count]) => (
            <TableRow
              key={topicName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {topicName}
              </TableCell>
              <TableCell align="right">{count}</TableCell>
              <TableCell align="right">
                {_.round((count * 100) / totalCount, 1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopicAccordionTable;

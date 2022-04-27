import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { groupedIdMap } from "features/Dashboard/Subscriptions/topicIdMap";
import { ITopicOccurences } from "features/Dashboard/Subscriptions/types";

interface ITopicAccordionTableProps {
  categoryName: string;
  totalCount: number;
  topicCounts: ITopicOccurences;
}

const TopicAccordionTable = ({
  categoryName,
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
          {Object.values(
            groupedIdMap[categoryName as keyof typeof groupedIdMap]
          ).map((topicName) => (
            <TableRow
              key={topicName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {topicName}
              </TableCell>
              <TableCell align="right">{topicCounts[topicName]}</TableCell>
              <TableCell align="right">
                {((topicCounts[topicName] * 100) / totalCount).toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopicAccordionTable;

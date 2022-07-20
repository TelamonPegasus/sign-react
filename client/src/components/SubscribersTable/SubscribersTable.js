import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const styles = {
  tableContainer: { maxWidth: 700, marginBottom: 30 },
  linkIcon: { paddingRight: 3, fontSize: 20, color: "#d63e2f" },
};

const SubscribersTable = ({ subscribersData, onRemove }) => (
  <TableContainer component={Paper} style={styles.tableContainer}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Update</TableCell>
          <TableCell>Remove</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subscribersData.map((subscriber, index) => (
          <Subscriber
            key={subscriber._id}
            subscriber={subscriber}
            onRemove={onRemove}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const Subscriber = ({ subscriber, onRemove, index }) => {
  const { _id: id, name, email, date, roles } = subscriber;
  const splittedDate = date.split(" ");
  const navigate = useNavigate();

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        {roles?.Admin ? "admin" : roles?.Editor ? "editor" : "user"}
      </TableCell>
      <TableCell>{splittedDate[0]}</TableCell>
      <TableCell>{splittedDate[1]}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<ModeEditIcon />}
          onClick={() => navigate(`/update-subscriber/${id}`)}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => onRemove(id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default SubscribersTable;

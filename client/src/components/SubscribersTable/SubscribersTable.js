import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import {
  StyledButton,
  StyledTableContainer,
} from "components/EmployeesTable/styles";

const SubscribersTable = ({ subscribersData, onRemove, checkUserId }) => (
  <StyledTableContainer>
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
            checkUserId={checkUserId}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  </StyledTableContainer>
);

const Subscriber = (props) => {
  const { subscriber, onRemove, checkUserId, index } = props;
  const { _id: id, name, email, date, roles } = subscriber;
  const splittedDate = date.split(" ");

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
        <StyledButton
          icon={<ModeEditIcon />}
          color="success"
          onClick={() => checkUserId(id)}
        />
      </TableCell>
      <TableCell>
        <StyledButton
          icon={<DeleteIcon />}
          color="error"
          onClick={() => onRemove(id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default SubscribersTable;

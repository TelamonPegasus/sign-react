import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { StyledButton, StyledTableContainer } from "./styles";

const EmployeesTable = ({ employeesData, onRemove }) => (
  <StyledTableContainer>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Surname</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Update</TableCell>
          <TableCell>Remove</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employeesData.map((employee, index) => (
          <Employee
            key={employee._id}
            employee={employee}
            onRemove={onRemove}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  </StyledTableContainer>
);

const Employee = ({ employee, onRemove, index }) => {
  const { _id: id, name, surname, date } = employee;
  const navigate = useNavigate();

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{surname}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <StyledButton
          icon={<ModeEditIcon />}
          color="success"
          onClick={() => navigate(`/update-employee/${id}`)}
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

export default EmployeesTable;

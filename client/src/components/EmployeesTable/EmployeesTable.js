import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

const styles = {
  headingTable: { fontSize: 20 },
};
const EmployeesTable = ({ employeesData, onRemove }) => (
  <div>
    <p style={styles.headingTable}>List:</p>

    <TableContainer component={Paper} style={{ maxWidth: 600 }}>
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
    </TableContainer>
  </div>
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
        <Button
          variant="outlined"
          startIcon={<ModeEditIcon />}
          onClick={() => navigate(`/update-employee/${id}`)}
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

export default EmployeesTable;

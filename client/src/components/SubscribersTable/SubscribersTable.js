import { makeStyles } from "@material-ui/core";
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
import { toast } from "react-toastify";

import { useAuthContext } from "context/AuthProvider";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const styles = {
  tableContainer: { maxWidth: 700, marginBottom: 30 },
  linkIcon: { paddingRight: 3, fontSize: 20, color: "#d63e2f" },
};

const SubscribersTable = ({ subscribersData, onRemove, allowedRoles }) => (
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
            allowedRoles={allowedRoles}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const Subscriber = ({ subscriber, onRemove, index, allowedRoles }) => {
  const { _id: id, name, email, date, roles } = subscriber;
  const splittedDate = date.split(" ");

  const navigate = useNavigate();
  const { auth } = useAuthContext();

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
          onClick={() =>
            auth?.roles.filter((role) => allowedRoles.includes(role)).length
              ? navigate(`/update-subscriber/${id}`)
              : toast.error(
                  () =>
                    "You can not update the data. Only admin or editor can do it!",
                  toastConfig
                )
          }
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() =>
            auth?.roles.find((role) => role === 5150)
              ? onRemove(id)
              : toast.error(
                  () => "You can not remove the data. Only admin can do it!",
                  toastConfig
                )
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default SubscribersTable;

import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";

import { styles, useStyles } from "./styles.js";
import { useAuthContext } from "context/AuthProvider.js";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const EmployeesNavigation = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const { auth } = useAuthContext();

  const handleOnClick = () => {
    auth?.roles.find((role) => role === 5150)
      ? navigate("/create-employee")
      : toast.error(
          () => "You can not add a new Employee. Only admin can do it!",
          toastConfig
        );
  };

  return (
    <Button
      variant="outlined"
      className={classes.button}
      onClick={handleOnClick}
    >
      <AiOutlineUserAdd style={styles.linkIcon} />
      add employee
    </Button>
  );
};

export default EmployeesNavigation;

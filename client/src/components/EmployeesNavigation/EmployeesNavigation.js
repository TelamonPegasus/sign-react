import { NavLink, Outlet } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { AiOutlineUserAdd } from "react-icons/ai";

import { styles, useStyles } from "./styles.js";

const EmployeesNavigation = ({ allowedRoles }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <NavLink to="/create-employee" style={styles.link}>
          <AiOutlineUserAdd style={styles.linkIcon} />
          add employee
        </NavLink>
      </AppBar>

      <Outlet />
    </>
  );
};

export default EmployeesNavigation;

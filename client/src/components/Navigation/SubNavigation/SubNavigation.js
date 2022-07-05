import { NavLink, Outlet } from "react-router-dom";
import { AppBar, Toolbar, useTheme, useMediaQuery } from "@material-ui/core";
import { RiAdminFill } from "react-icons/ri";
import { ImDatabase } from "react-icons/im";
import { MdOutlineCastForEducation } from "react-icons/md";

import { styles, useStyles } from "./styles.js";
import { useAuthContext } from "context/AuthProvider.js";

const SubNavigation = ({ allowedRoles }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { auth } = useAuthContext();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        {/* <Toolbar className={classes.toolBar} justifyContent="space-between"> */}
        <NavLink
          to="courses"
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <MdOutlineCastForEducation style={styles.linkIcon} />
          Courses
        </NavLink>
        <NavLink
          to="data"
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ImDatabase style={styles.linkIcon} />
          Data
        </NavLink>

        {auth?.roles.find((role) => allowedRoles.includes(role)) && (
          <NavLink
            to="users"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            <RiAdminFill style={styles.linkIcon} />
            Users
          </NavLink>
        )}
        {/* </Toolbar> */}
      </AppBar>

      <Outlet />
    </>
  );
};

export default SubNavigation;

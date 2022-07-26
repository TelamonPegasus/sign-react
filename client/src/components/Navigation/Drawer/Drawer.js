import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Drawer } from "@mui/material";
import { MdOutlineMenu } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

import { useAuthContext } from "context/AuthProvider";

import { SignInLink } from "../SignInLink";
import { SignUpLink } from "../SignUpLink";
import { LogOut } from "../LogOut";

const styles = {
  activeLink: {
    textDecoration: "none",
    color: "#d63e2f",
    fontSize: 20,
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: 20,
  },
  icon: { color: "#d63e2f" },
};

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: 20,
  },
  icon: {
    color: "#d63e2f",
  },
  drawer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const DrawerComponent = () => {
  const classes = useStyles();
  const { userPersist } = useAuthContext();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{
          paper: classes.drawer,
        }}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Home
            </NavLink>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NavLink
                to="/about"
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                About
              </NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NavLink
                to="/secure-content"
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                <FiUser style={styles.linkIcon} />
                For you
              </NavLink>
            </ListItemText>
          </ListItem>
          {userPersist ? (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <LogOut />
              </ListItemText>
            </ListItem>
          ) : (
            <>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <SignInLink />
                </ListItemText>
              </ListItem>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <SignUpLink />
                </ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        {!openDrawer ? (
          <MdOutlineMenu className={classes.icon} />
        ) : (
          <RiMenu2Fill className={classes.icon} />
        )}
      </IconButton>
    </>
  );
};

export default DrawerComponent;

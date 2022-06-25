import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Drawer } from "@mui/material";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineMenu } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";

const styles = {
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
    fontSize: "20px",
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
            <Link to="/" style={styles.link}>
              Home
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <Link to="/courses" style={styles.link}>
              Courses
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/about" style={styles.link}>
                About us
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/login" style={styles.link}>
                <BiUserCircle style={styles.icon} />
              </Link>
            </ListItemText>
          </ListItem>
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

import { makeStyles } from "@material-ui/core";

export const styles = {
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

export const useStyles = makeStyles(() => ({
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

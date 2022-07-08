import { makeStyles } from "@material-ui/core";

export const styles = {
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: 15,
    display: "flex",
  },
  activeLink: {
    textDecoration: "none",
    color: "#d63e2f",
    fontSize: 15,
    display: "flex",
  },
  linkIcon: { fontSize: 20, color: "#d63e2f", paddingRight: 3 },
};

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
    gap: 35,
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 20,
    },
  },
}));

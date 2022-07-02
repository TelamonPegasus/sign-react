import { makeStyles } from "@material-ui/core";

export const styles = {
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 30,
    width: "100%",
  },
  linksContainer: {
    display: "flex",
    gap: 40,
    alignItems: "center",
  },
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
  icon: { color: "#d63e2f" },
  linkIcon: { fontSize: 20, color: "#d63e2f", paddingRight: 3 },
  signLinks: {
    display: "flex",
    justifyContent: "row",
    gap: 20,
  },
};

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  toolbar: { justifyContent: "space-between" },
}));

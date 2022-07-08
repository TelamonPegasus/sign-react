import { makeStyles } from "@material-ui/core";

export const styles = {
  link: {
    maxWidth: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "3px 6px",
    fontSize: 15,
    color: "#d63e2f",
    textDecoration: "none",
    border: "1px solid #d63e2f",
  },
  linkIcon: { paddingRight: 3, fontSize: 20, color: "#d63e2f" },
};

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    maxWidth: 300,
  },
}));

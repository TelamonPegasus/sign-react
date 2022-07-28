import { makeStyles } from "@material-ui/core";

export const styles = {
  tableContainer: { maxWidth: 700, marginBottom: 30 },
  linkIcon: { paddingRight: 3, fontSize: 20, color: "#d63e2f" },
  tableContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 60,
  },
  informationText: {
    padding: "20px 0",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export const useStyles = makeStyles((theme) => ({
  button: {
    color: "#d63e2f",
  },
}));

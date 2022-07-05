import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "uppercase",
    border: "1px solid",
    lineHeight: 1.5,
    padding: "1rem 3rem",
    backgroundColor: "#d63e2f",
    margin: "30px 0 30px 0",
    fontSize: 18,
    color: "white",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    "&:hover": {
      backgroundColor: "#c74538",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#c74538",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
}));

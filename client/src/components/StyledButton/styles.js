import { makeStyles } from "@material-ui/core";

export const styles = {
  buttonIcon: {
    fontSize: 25,
    color: "white",
  },
};

export const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "uppercase",
    lineHeight: 1.5,
    padding: "10px 30px",
    backgroundColor: "#d63e2f",
    margin: "30px 0 30px 0",
    border: "none",
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

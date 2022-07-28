import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogActions from "@material-ui/core/DialogActions";

const stylesDialogActions = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    color: "green",
  },
  closeButton: {
    color: "crimson",
  },
});

const DialogActions = withStyles(stylesDialogActions)((props) => {
  const { classes, onClose, callback } = props;
  return (
    <MuiDialogActions className={classes.root}>
      <Button
        onClick={() => [callback(), onClose()]}
        className={classes.confirmButton}
      >
        YES
      </Button>
      <Button onClick={onClose} className={classes.closeButton}>
        NO
      </Button>
    </MuiDialogActions>
  );
});

export default DialogActions;

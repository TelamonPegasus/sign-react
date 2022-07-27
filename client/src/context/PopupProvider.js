import { createContext, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const PopupContext = createContext({});

export const PopupProvider = ({ children }) => {
  const toastId = useRef(null);
  const [open, setOpen] = useState(true);

  const openToast = (message, type) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current =
        type === "error"
          ? toast.error(() => message, toastConfig)
          : toast.success(() => message, toastConfig);
    }
  };

  const openConfirmationModal = (config) => {
    if (config.action && typeof config.action !== "function") {
      throw new Error("config action callback has to be a function");
    }

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DialogMigrate
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            onClose={() => setOpen(false)}
          >
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
              {config.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>{config.question}</Typography>
            </DialogContent>

            <DialogActions callback={config.action} onClose={onClose} />
          </DialogMigrate>
        );
      },
    });
  };

  return (
    <PopupContext.Provider value={{ openToast, openConfirmationModal }}>
      {children}
    </PopupContext.Provider>
  );
};

function DialogMigrate({
  children,
  disableBackdropClick,
  disableEscapeKeyDown,
  onClose,
  ...rest
}) {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") {
      return false;
    }

    if (disableEscapeKeyDown && reason === "escapeKeyDown") {
      return false;
    }

    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <Dialog onClose={handleClose} {...rest}>
      {children}
    </Dialog>
  );
}

const stylesTitle = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "crimson",
  },
});

const DialogTitle = withStyles(stylesTitle)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (context === undefined || context === null) {
    throw new Error("PopupContext must be used within a Provider");
  }
  return context;
};

export default PopupContext;

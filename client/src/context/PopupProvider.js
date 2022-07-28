import { createContext, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Typography from "@material-ui/core/Typography";

import {
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogMigrate,
} from "components/Modal";

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

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (context === undefined || context === null) {
    throw new Error("PopupContext must be used within a Provider");
  }
  return context;
};

export default PopupContext;

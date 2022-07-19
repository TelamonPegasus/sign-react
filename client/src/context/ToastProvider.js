import { createContext, useContext, useState, useRef } from "react";
import { toast } from "react-toastify";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const toastId = useRef(null);

  const displayToast = (message, type) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current =
        type === "error"
          ? toast.error(() => message, toastConfig)
          : toast.success(() => message, toastConfig);
    }
  };

  return (
    <ToastContext.Provider value={{ displayToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined || context === null) {
    throw new Error("ToastContext must be used within a Provider");
  }
  return context;
};

export default ToastContext;

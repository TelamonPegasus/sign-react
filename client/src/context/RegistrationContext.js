import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import api from "api";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const endpointUsers = " https://react-sign-in-up.herokuapp.com/users";
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(endpointUsers);

      console.log("response:", response);
      setUsers(response);
      setIsLoading(false);
    } catch (error) {
      toast.error("Unsuccessfull fetching data", toastConfig);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await api.post(`${endpointUsers}`, newUser);

      setUsers([...users, response]);

      toast.success("added successfully", toastConfig);

      setTabValue("1");
    } catch (error) {
      toast.error("User has not been added", toastConfig);
    }
  };

  const handleChangeTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <RegistrationContext.Provider
      value={{
        users,
        addUser,
        isLoading,
        tabValue,
        handleChangeTabValue,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined || context === null) {
    throw new Error("RegistrationContext must be used within a Provider");
  }
  return context;
};

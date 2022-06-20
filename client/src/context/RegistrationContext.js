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
  const API_USERS = "/api/users";

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(API_USERS);

      setUsers(response.users);

      setIsLoading(false);
    } catch (error) {
      toast.error("Unsuccessfull fetching data", toastConfig);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await api.post(`${API_USERS}`, newUser);

      setUsers([...users, response]);

      toast.success("added successfully", toastConfig);

      setTabValue("1");
    } catch (error) {
      toast.error("User has not been added", toastConfig);
    }
  };

  console.log("users", users);
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

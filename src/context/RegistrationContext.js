import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import api from "api";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const endpointUsers = "/users";
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await api.get(`${endpointUsers}`);

    setUsers(response);
    setIsLoading(false);
  };

  const addUser = async (newUser) => {
    try {
      const response = await api.post(`${endpointUsers}`, newUser);

      setUsers([...users, response]);

      toast.success("added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTabValue("1");
    } catch (error) {
      console.log(error);
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
  if (context === undefined) {
    throw new Error("RegistrationContext must be used within a Provider");
  }
  return context;
};

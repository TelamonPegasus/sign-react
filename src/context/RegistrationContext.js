import { createContext, useState, useEffect } from "react";

import api from "api";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const endpointUsers = "/users";
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await api.get(endpointUsers);

    setUsers(response);
    setIsLoading(false);
  };

  const addUser = async (newUser) => {
    const response = await api.post(endpointUsers, newUser);

    setUsers([...users, response]);
  };

  return (
    <RegistrationContext.Provider
      value={{
        users,
        addUser,
        isLoading,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

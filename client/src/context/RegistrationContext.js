import { createContext, useState, useContext } from "react";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const REGISTER_ENDPOINT = "/api/register";
  const LOGIN_ENDPOINT = "/api/login";

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tabValue, setTabValue] = useState("1");

  const handleChangeTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <RegistrationContext.Provider
      value={{
        users,
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

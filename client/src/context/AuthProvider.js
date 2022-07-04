import { createContext, useContext, useState } from "react";

import { useSessionStorageValue } from "customHooks/useSessionStorageValue";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [userPersist, setUserPersist] = useSessionStorageValue(
    "persist",
    false
  );

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, userPersist, setUserPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error("AuthContext must be used within a Provider");
  }
  return context;
};

export default AuthContext;

import { useState, useEffect } from "react";

const useSessionStorageValue = (keyName, defaultValue) => {
  const getInitialValue = () => {
    const sessionStorageValue = sessionStorage.getItem(keyName);

    if (sessionStorageValue === null) {
      return defaultValue;
    }

    return JSON.parse(sessionStorage.getItem(keyName));
  };

  const [state, setState] = useState(getInitialValue);

  useEffect(() => {
    sessionStorage.setItem(keyName, JSON.stringify(state));
  }, [keyName, state]);

  return [state, setState];
};

export default useSessionStorageValue;

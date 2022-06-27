import { useState, useEffect } from "react";

export const useLocalStorageValue = (keyName, defaultValue) => {
  const getInitialValue = () => {
    const localStorageValue = localStorage.getItem(keyName);

    if (localStorageValue === null) {
      return defaultValue;
    }

    return JSON.parse(localStorage.getItem(keyName));
  };

  const [state, setState] = useState(getInitialValue);

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(state));
  }, [keyName, state]);

  return [state, setState];
};

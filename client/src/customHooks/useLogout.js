import axios from "api/axios";

import { useAuthContext } from "context/AuthProvider";

const useLogout = () => {
  const { setAuth, setUserPersist } = useAuthContext();

  const logout = async () => {
    setAuth({});
    setUserPersist(false);

    try {
      // send secure cookie back with this request to this endpoint
      await axios("/api/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;

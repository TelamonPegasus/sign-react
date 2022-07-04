const { default: axios } = require("api/axios");
const { useAuthContext } = require("context/AuthProvider");

export const useLogout = () => {
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

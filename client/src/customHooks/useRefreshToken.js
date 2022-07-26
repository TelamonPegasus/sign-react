import { useAuthContext } from "context/AuthProvider";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/api/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        name: response.data.name,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    // taking the prev state and overvrite the access token - all of the state is in the prev
    // also getting the roles and name

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;

import axios from "../api/axios";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
  return refresh;
};

import { useAuthContext } from "context/AuthProvider";
import axios from "../api/axios";

export const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refreshToken = async () => {
    const response = await axios.get("/api/refresh", {
      withCredentials: true,
    });

    console.log(response);
    setAuth((prev) => {
      console.log("prev:", prev);
      return { accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refreshToken;
};

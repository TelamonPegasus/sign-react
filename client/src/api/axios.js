import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-sign-in-up.herokuapp.com"
    : "http://localhost:5000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

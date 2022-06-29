import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const request = async (endpoint, method = "get", data) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });

  const response = await instance({
    url: endpoint,
    method,
    data: method === "post" || method === "patch" ? data : {},
  });

  // if (!response) {
  //   throw new Error("Something happened - no data");
  // }

  return response.data;
};

const get = (endpoint) => request(endpoint);

const post = (endpoint, data) => request(endpoint, "post", data);

const patch = (endpoint, data) => request(endpoint, "patch", data);

const _delete = (endpoint) => request(endpoint, "delete");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  post,
  patch,
  delete: _delete,
};

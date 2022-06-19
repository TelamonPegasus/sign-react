import axios from "axios";

const request = async (endpoint, method = "get", data) => {
  const instance = axios.create({
    baseURL: "https://react-sign-in-up.herokuapp.com",
    headers: {
      "Content-type": "application/json",
    },
  });

  const response = await instance({
    url: endpoint,
    method,
    data: method === "post" || method === "patch" ? data : {},
  });

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

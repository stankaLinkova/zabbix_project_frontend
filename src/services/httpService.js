import axios from "axios";
import apiUrl from "../config.json";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    alert("An unexpected error occured.");
  }

  return Promise.reject(error);
});

const instance = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

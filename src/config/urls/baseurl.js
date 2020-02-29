import { API_URL } from "./env";
import axios from "axios";
import AuthService from "../auth";

let Auth = new AuthService();

const baseurl = axios.create({
  baseURL: API_URL,
  timeout: 100000,
  headers: {
    "content-Type": "application/json"
  }
});

baseurl.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// baseurl.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       return response;
//     } else {
//       window.location = "/";
//     }
//   },
//   error => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         Auth.destroyToken();
//       }
//     }
//   }
// );

export default baseurl;

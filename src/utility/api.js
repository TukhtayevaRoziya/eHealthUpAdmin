import axios from "axios";
import store from "../redux/store";
import { LOGOUT } from "../redux/actions/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://backbuild.softcity.uz/api/',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Authorization": "token 42d7fdd581b511cde0fca3fca8d928cd2df7689b"
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;

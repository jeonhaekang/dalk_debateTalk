import axios from "axios";
import { getCookie } from "./Cookie";

const instance = axios.create({
  baseURL: "",
});

instance.interceptors.request.use(function (config) {
  const token = getCookie("authorization");

  config.headers["Content-Type"] =
    "application/json;charset=UTF-8; charset=UTF-8";

  config.headers.common["authorization"] = `${token}`;
  return config;
});

const apis = {};

export default apis;

import axios from "axios";
import { getCookie } from "./Cookie";

export const instance = axios.create({
  baseURL: "http://13.124.244.126:8080",
});

instance.interceptors.request.use(function (config) {
  const token = getCookie("authorization");

  config.headers["Content-Type"] =
    "application/json;charset=UTF-8; charset=UTF-8";

  config.headers.common["authorization"] = `${token}`;
  return config;
});

const apis = {
  //유저 로그인 api
  login: (user) => instance.post("/users/login", user),
  
  //유저 회원가입 api
  signup: (user) => instance.post("/users/signup", user),
};

export default apis;

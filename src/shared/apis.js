import axios from "axios";
import { getCookie } from "./Cookie";

export const instance = axios.create({
  baseURL: "http://54.180.8.233:8080",
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

  //로그인 체크
  check : () => instance.get("/loginCheck"),
};

export default apis;

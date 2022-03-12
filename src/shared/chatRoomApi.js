import axios from "axios";
import { history } from "../redux/configStore";
import { getCookie } from "./Cookie";
import { cacheAdapterEnhancer } from "axios-extensions";

const token = getCookie("authorization");
export const instance = axios.create({
  baseURL: "http://13.124.244.126:8080",
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: true,
  }),
});

const historyPopCache = (config) => ({
  forceUpdate: history.action === "PUSH",
  ...config,
  cache: true,
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] =
      "application/json;charset=UTF-8; charset=UTF-8";
    config.headers["authorization"] = token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
  //   console.log(response);
  return response;
});

const chatRoomApis = {
  // ---------토론방 관련------------
  //토론방 생성
  createRoom: (data) => instance.post("/rooms", data),

  //토론방 리스트 전체보기
  loadAllRoom: () =>
    instance.get("/api/rooms", { forceUpdate: false, cache: true }),

  //토론방 메인 리스트 가져오기
  loadMainRoom: () => instance.get("api/main/rooms"),

  //토론방 카테고리별로 가져오기
  loadCategoryRoom: (category) => instance.get("/api/main/" + category),

  //카테고리별 베스트 토론방
  loadBestRoom: (category) => instance.get("/api/category/best/" + category),

  //토론방 정보 가져오기
  getOneRoom: (roomId) => instance.get("/rooms/" + roomId),

  //투표자 명단 가져오기
  getVoteUser: (roomId) => instance.get("/vote/users/" + roomId),

  //투표하기
  vote: (roomId, data) => instance.post("/vote/" + roomId, data),
};

export default chatRoomApis;

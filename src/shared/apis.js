import axios from "axios";
import { getCookie } from "./Cookie";

export const instance = axios.create({
  //baseURL: "http://54.180.8.233:8080",
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

  //로그인 체크
  check: () => instance.get("/loginCheck"),

  // ---------토론방 관련------------
  //토론방 생성
  createRoom: (data) => instance.post("/rooms", data),

  //토론방 리스트 전체보기
  loadAllRoom: () => instance.get("/api/rooms"),

  //토론방 정보 가져오기
  getOneRoom: (roomId) => instance.get("/rooms/" + roomId),

  // ---------댓글 코멘트 관련------------
  // 댓글 조회
  getComment: (boardId) => instance.get(`/api/comments/${boardId}`),
  // 댓글 작성
  addComment: (boardId, comment) =>
    instance.post(`/comments/${boardId}`, { comment: comment }),
  // 댓글 삭제
  deleteComment: (commentId) => instance.delete(`/comments/${commentId}`),
  // 댓글 좋아요
  likeComment: (commentId) => instance.get(`/likes/${commentId}`),
  // 댓글 신고
  warningComment: (boardId) => instance.get(`/warnings/${boardId}`),
};

export default apis;
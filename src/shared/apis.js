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

  //로그인 체크
  check: () => instance.get("/loginCheck"),

  //랭킹
  rank: () => instance.get("/api/ranks"),

  //아이템 구매
  buyItem: (item) => instance.get("/mypage/" + item),

  // ---------토론방 관련------------
  //토론방 생성
  createRoom: (data) => instance.post("/rooms", data),

  //토론방 리스트 전체보기
  loadAllRoom: () => instance.get("/api/rooms"),

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

  // ---------댓글 코멘트 관련------------
  // 댓글 조회
  getComment: (boardId) => instance.get(`/api/comments/${boardId}`),
  // 댓글 작성
  addComment: (boardId, comment) =>
    instance.post(`/comments/${boardId}`, { comment: comment }),
  // 댓글 삭제
  deleteComment: (commentId) => instance.delete(`/comments/${commentId}`),
  // 댓글 찬성
  agreeComment: (commentId) => instance.get(`/agree/${commentId}`),
  // 댓글 반대
  disagreeComment: (commentId) => instance.get(`/disagree/${commentId}`),
  // 댓글 신고
  warningComment: (commentId) =>
    instance.get(`/warnings/comments/${commentId}`),

  // ---------게시글 상세조회------------
  getOneDebate: (boardId) => instance.get(`/api/boards/${boardId}`),

  // ---------게시글 결과조회------------
  getDebate: () => instance.get(`/api/boards`),

  // ---------게시글 검색------------
  getDebateKeyword: (keyword) => instance.get(`/api/keywords/${keyword}`),

  // 회원 탈퇴
  userOut : () => instance.delete(`/signout`),
  // 포인트 내역 조회
  pointcheck : () => instance.get(`/mypage/points`),

  // ---------관리자 페이지------------
  getblindboard: () => instance.get(`admin/boards`),
  delblindboard: (boardId) => instance.delete(`admin/boards/${boardId}`),
  getblindroom: () => instance.get(`admin/rooms`),
  delblindroom: (roomId) => instance.delete(`admin/rooms/${roomId}`),
  getWarnUser: () => instance.get(`admin/users`),
  delWarnUser: (userId) => instance.delete(`admin/users/${userId}`),
  getBannerList: () => instance.get(`admin/carousels`),
  delBannerList: (carouselId) => instance.delete(`admin/carousels/${carouselId}`),
};

export default apis;

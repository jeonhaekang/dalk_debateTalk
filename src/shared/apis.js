import axios from "axios";
import { history } from "../redux/configStore";
import { deleteCookie, getCookie } from "./Cookie";

export const instance = axios.create({
  baseURL: "http://3.34.199.42:8080", //영민님 주소
  // baseURL: "http://44.201.245.76:8080", //지훈님 주소
});

instance.interceptors.request.use((config) => {
  const token = getCookie("authorization");

  if (!config.url.includes("api") && !config.url.includes("users") && !token) {
    deleteCookie("authorization");
    throw new axios.Cancel(400);
  }
  config.headers["Content-Type"] =
    "application/json;charset=UTF-8; charset=UTF-8";

  config.headers.common["authorization"] = `${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error) && error.message === 400) {
      history.goBack();
      console.log("로그인 해라");
    }
    return Promise.reject(error);
  }
);

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

  //아이템 사용
  ItemUse: (item) => instance.get("/chat/rooms/" + item),

  //행운뽑기
  Gacha: () => instance.get("/lotto"),

  //유저신고하기
  reportUser: (userId, message) => instance.get("/warnings/" + userId, message),

  // ---------캐러셀 관련------------
  carousels: () => instance.get("/api/carousels"),

  // ---------토론방 관련------------
  //토론방 생성
  createRoom: (data) => instance.post("/rooms", data),

  //토론방 리스트 전체보기
  loadAllRoom: (size, page) => {
    console.log(size, page);
    return instance.get(`/api/rooms?size=${size}&page=${page}`);
  },

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

  // ---------게시글 관련------------
  // 게시글 상세조회
  getOneDebate: (boardId) => instance.get(`/api/boards/${boardId}`),
  // 게시글 결과조회
  getDebate: (page, size) =>
    instance.get(`/api/boards?size=${size}&page=${page}`),
  // ---------게시글 검색------------
  getDebateKeyword: (keyword) => instance.get(`/api/keywords/${keyword}`),
  // ---------게시글 신고------------
  warningDebate: (boardId) => instance.get(`/warnings/boards/${boardId}`),

  // ---------마이페이지------------
  // 회원 탈퇴
  userOut: () => instance.delete(`/signout`),
  // 포인트 내역 조회
  pointcheck: () => instance.get(`/mypage/points`),

  // ---------관리자 페이지------------
  //블라인드 게시물
  getblindboard: () => instance.get(`admin/boards`),
  delblindboard: (boardId) => instance.delete(`admin/boards/${boardId}`),
  //블라인드 채팅방
  getblindroom: () => instance.get(`admin/rooms`),
  delblindroom: (roomId) => instance.delete(`admin/rooms/${roomId}`),
  //불량 유저
  getWarnUser: () => instance.get(`admin/users`),
  delWarnUser: (userId) => instance.delete(`admin/users/${userId}`),
  //배너
  getBannerList: () => instance.get(`admin/carousels`),
  addBanner: (image) => instance.post(`admin/carousels`, image),
  delBannerList: (carouselId) =>
    instance.delete(`admin/carousels/${carouselId}`),
};

export default apis;

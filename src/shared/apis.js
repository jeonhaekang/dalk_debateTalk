import axios from "axios";
import { history } from "../redux/configStore";
import { deleteCookie, getCookie } from "./Cookie";
import { actionCreators as alertAction } from "../redux/modules/alert";
import store from "../redux/configStore";
import { cacheAdapterEnhancer } from "axios-extensions";

export const instance = axios.create({
  baseURL: "http://ddanddan.shop",
  // baseURL: "https://raddas.site",
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false, // 기본 캐싱 설정을 false로
  }),
});

instance.interceptors.request.use((config) => {
  // ----------------------------------------------------------------------------------------------------
  // history action이 push이면 데이터 갱신
  config.forceUpdate = history.action === "PUSH"; // true일경우 캐시 데이터가 있더라도 서버에 데이터를 요청한다
  config.cache = true;

  const token = getCookie("authorization");
  // ----------------------------------------------------------------------------------------------------
  // 사용자가 로그인하지 않고 url을 통해 로그인이 필요한 서비스에 접근시 차단
  if (!config.url.includes("api") && !config.url.includes("users") && !token) {
    deleteCookie("authorization");
    throw new axios.Cancel(400);
  }
  // ----------------------------------------------------------------------------------------------------
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
    // ----------------------------------------------------------------------------------------------------
    // 로그인 하지 않아 차단된 유저에게 안내
    if (axios.isCancel(error) && error.message === 400) {
      store.dispatch(
        alertAction.open({
          type: "confirm",
          message: "로그인이 필요합니다.",
          history: () => history.replace("/"),
          action: () => history.replace("/login"),
        })
      );
    }
    return Promise.reject(error);
  }
);

const apis = {
  //유저 로그인 api
  login: (user) => instance.post("/users/login", user),

  //유저 회원가입 api
  signup: (user) => instance.post("/users/signup", user),

  //아이디 중복검사
  idValidate: (username) =>
    instance.post("/users/signup/usernamecheck", { username: username }),

  //닉네임 중복검사
  nicknameValidate: (nickname) =>
    instance.post("/users/signup/nicknamecheck", { nickname: nickname }),

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

  // 토론방 관련---------------------------------------------------------------------------------------------
  //토론방 메인 리스트 가져오기
  mainRoomList: () => instance.get("api/main/rooms"),

  //토론방 생성
  createRoom: (data) => instance.post("/rooms", data),

  //토론방 리스트 전체보기
  loadAllRoom: (size, page) =>
    instance.get(`/api/rooms?size=${size}&page=${page}`),

  //토론방 검색
  searchRoom: (size, page, keyword) =>
    instance.get(`/api/main/${keyword}?size=${size}&page=${page}`),

  //토론방 카테고리 가져오기
  loadCategoryRoom: (size, page, category) =>
    instance.get(`/api/category/${category}?size=${size}&page=${page}`),

  //카테고리별 베스트 토론방
  loadBestRoom: (category) => instance.get("/api/category/best/" + category),

  //토론방 정보 가져오기
  getOneRoom: (roomId) => instance.get("/rooms/" + roomId),

  //투표자 명단 가져오기
  getVoteUser: (roomId) => instance.get("/vote/users/" + roomId),

  //투표하기
  vote: (roomId, data) => instance.post("/vote/" + roomId, data),

  //이전 메세지 로딩
  messageLog: (roomId) => instance.get("/rooms/messages/" + roomId),

  //채팅방 참가 인원 목록
  roomUsers: (roomId) => instance.get("/rooms/users/" + roomId),

  //카테고리 베스트
  categoryBest: (category) => instance.get("/api/category/best/" + category),

  //토론방 신고
  reportRoom: (roomId) => instance.get("/warnings/rooms/" + roomId),

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
  getDebate: (size, page) =>
    instance.get(`/api/boards?size=${size}&page=${page}`),
  // ---------게시글 검색------------
  getDebateKeyword: (keyword, size, page) =>
    instance.get(`/api/keywords/${keyword}?size=${size}&page=${page}`),
  // ---------게시글 카테고리 조회------------
  getDebateCategory: (size, page, category) =>
    instance.get(`/api/boards/category/${category}?size=${size}&page=${page}`),
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
  addBanner: (data) => instance.post(`admin/carousels`, data),
  delBannerList: (carouselId) =>
    instance.delete(`admin/carousels/${carouselId}`),
  //공지사항
  getNotice: () => instance.get(`api/notices`),
  postNotice: (title, content) =>
    instance.post(`admin/notices`, { title: title, content: content }),
  updateNotice: (noticeId, title, content) =>
    instance.put(`admin/notices/${noticeId}`, {
      title: title,
      content: content,
    }),
  delNotice: (noticeId) => instance.delete(`/admin/notices/${noticeId}`),
  getDetailNotice: (noticeId) => instance.get(`/api/notices/${noticeId}`),
  //포인트 보내기
  sendPoint: (username, point, content) =>
    instance.post("/admin/eventpoint", {
      username: username,
      point: point,
      content: content,
    }),
  //불량댓글
  getWarnComment: () => instance.get("/admin/comments"),
  delWarnComment: (commentId) =>
    instance.delete(`/admin/comments/${commentId}`),
};

export default apis;

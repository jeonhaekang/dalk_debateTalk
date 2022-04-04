import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { deleteCookie, setCookie } from "../../shared/Cookie";
import { actionCreators as alertAction } from "./alert";

//Action
const SETUSER = "SETUSER";
const BUY_ITEM = "BUY_ITEM";
const ITEM_USE = "ITEM_USE";
const BUY_EXP = "BUY_EXP";
const SET_POINT = "SET_POINT";
const SET_RANK_LIST = "SET_RANK_LIST";
const LOTTO_COUNT = "LOTTO_COUNT";

//Action Creator
// const logIn = createAction(LOGIN, (user) => ({ user }));
const setUser = createAction(SETUSER, (user) => ({ user }));
const buyItem = createAction(BUY_ITEM, (item) => ({ item }));
const ItemUse = createAction(ITEM_USE, (item) => ({ item }));
const setPoint = createAction(SET_POINT, (point) => ({ point }));
const setRankList = createAction(SET_RANK_LIST, (list) => ({ list }));
const lottoCount = createAction(LOTTO_COUNT, () => ({}));

//initialState
const initialState = {
  user: null,
  userInfo: {},
  rankList: null,
};

//MiddleWare
// 회원가입 ----------------------------------------------------------------------------
const signUpDB = (username, password, nickname, passwordCheck) => {
  return function (dispatch) {
    const user = { username, password, passwordCheck, nickname };
    apis
      .signup(user)
      .then(() => {
        dispatch(logInDB(username, password));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "회원가입에 실패하였습니다.",
          })
        );
      });
  };
};

// 로그인 ----------------------------------------------------------------------------
const logInDB = (username, password) => {
  return async function (dispatch, getState, { history }) {
    const user = { username, password };
    await apis
      .login(user)
      .then((res) => {
        setCookie(res.headers.authorization, 7);
        dispatch(logincheckDB());
        history.replace("/");
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "아이디나 비밀번호가 틀렸습니다.",
          })
        );
      });
  };
};

// 유저정보 가져오기 ----------------------------------------------------------------------------
const logincheckDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .check()
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch(() => {
        deleteCookie("authorization");
        dispatch(
          alertAction.open({
            message: "다시 로그인 해주세요!",
          })
        );
        history.replace("/login");
      });
  };
};

// 아이템 구매 ----------------------------------------------------------------------------
const buyItemDB = (item) => {
  return function (dispatch) {
    apis
      .buyItem(item.itemCode)
      .then(() => {
        dispatch(buyItem(item));
        dispatch(alertAction.open({ message: "아이템을 구매하였습니다" }));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "아이템 구매 실패",
          })
        );
      });
  };
};

// 아이템 사용 ----------------------------------------------------------------------------
const useItemDB = (item) => {
  return function (dispatch) {
    apis
      .ItemUse(item)
      .then(() => {
        dispatch(ItemUse(item));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "아이템 사용 실패",
          })
        );
      });
  };
};

// 랭킹 리스트 호출 ----------------------------------------------------------------------------
const setRankListDB = (item) => {
  return function (dispatch, getState, { history }) {
    apis
      .rank()
      .then((res) => {
        dispatch(setRankList(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "랭크목록 불러오기 못하였습니다",
            history: () => history.replace("/"),
          })
        );
      });
  };
};

// 유저 신고 ----------------------------------------------------------------------------
const reportUserDB = (userId, message) => {
  return function (dispatch) {
    apis
      .reportUser(userId, message)
      .then(() => {
        dispatch(alertAction.open({ message: "유저를 신고하였습니다." }));
      })
      .catch((err) => {
        dispatch(alertAction.open({ message: "이미 신고한 유저입니다." }));
      });
  };
};

//Reducer
export default handleActions(
  {
    [LOTTO_COUNT]: (state) =>
      produce(state, (draft) => {
        draft.user.lottoCount -= 1;
      }),
    [SETUSER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [BUY_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.user.point -= action.payload.item.price;
        draft.user.item[action.payload.item.itemCode] += 1;
      }),
    [ITEM_USE]: (state, action) =>
      produce(state, (draft) => {
        draft.user.item[action.payload.item] -= 1;
      }),
    [BUY_EXP]: (state, action) =>
      produce(state, (draft) => {
        draft.user.point -= action.payload.item.price;
        draft.user.ex += 100;
      }),
    [SET_POINT]: (state, action) =>
      produce(state, (draft) => {
        draft.user.point += action.payload.point;
      }),
    [SET_RANK_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.rankList = action.payload.list;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  signUpDB,
  logInDB,
  logincheckDB,
  buyItemDB,
  useItemDB,
  setPoint,
  setRankListDB,
  reportUserDB,
  lottoCount,
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import { instance } from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";
import { useDispatch } from "react-redux";
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
  rankList: [],
};

//MiddleWare

// 회원가입 시 바로 로그인
const signUpDB = (username, password, nickname, passwordCheck) => {
  return async function (dispatch, getState, { history }) {
    const user = {
      username: username,
      password: password,
      passwordCheck: passwordCheck,
      nickname: nickname,
    };
    await apis
      .signup(user)
      .then(function (response) {
        const _user = {
          username: user.username,
          password: user.password,
        };
        apis
          .login(_user)
          .then((res) => {
            const token = res.headers.authorization;
            setCookie(res.headers.authorization, 7);
            instance
              .get("/loginCheck", {
                headers: {
                  authorization: token,
                },
              })
              .then((res) => {
                dispatch(setUser(res.data));
                history.replace("/");
              })
              .catch((err) => {
                dispatch(
                  alertAction.open({
                    message: "로그인 체크 실패",
                  })
                );
              });
          })
          .catch((err) => {
            dispatch(
              alertAction.open({
                message: "로그인 실패",
              })
            );
          });
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "아이디 또는 닉네임이 중복입니다.",
          })
        );
      });
  };
};

const logInDB = (username, password) => {
  return async function (dispatch, getState, { history }) {
    const user = {
      username: username,
      password: password,
    };
    await apis
      .login(user)
      .then(function (response) {
        console.log(response);
        setCookie(response.headers.authorization, 7);

        apis
          .check()
          .then((res) => {
            dispatch(setUser(res.data));
            history.replace("/");
          })
          .catch((err) => {
            console.log(err.response);
            dispatch(
              alertAction.open({
                message: "로그인 체크 실패",
              })
            );
          });
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "아이디나 비밀번호가 틀렸습니다.",
          })
        );
      });
  };
};

const logincheckDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .check()
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "다시 로그인 해주세요!",
          })
        );
        history.push("/login");
      });
  };
};

const buyItemDB = (item) => {
  return function (dispatch, getState, { history }) {
    apis
      .buyItem(item.itemCode)
      .then((res) => {
        dispatch(buyItem(item));
        dispatch(alertAction.open({ message: "아이템을 구매하였습니다" }));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "아이템 구매 실패",
          })
        );
      });
  };
};

const useItemDB = (item) => {
  return function (dispatch, getState, { history }) {
    apis
      .ItemUse(item)
      .then((res) => {
        dispatch(ItemUse(item));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "아이템 사용 실패",
          })
        );
      });
  };
};

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
            message: "랭크목록 불러오기 실패",
          })
        );
      });
  };
};

const reportUserDB = (userId, message) => {
  return function (dispatch, getState, { history }) {
    apis
      .reportUser(userId, message)
      .then((res) => {
        dispatch(
          alertAction.open({ type: "alert", message: "유저를 신고하였습니다." })
        );
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            type: "alert",
            message: "이미 신고한 유저입니다.",
          })
        );
      });
  };
};

//Reducer
export default handleActions(
  {
    [LOTTO_COUNT]: (state, action) =>
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

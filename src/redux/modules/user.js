import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import { instance } from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";
//Action
// const LOGIN = 'LOGIN'
const LOGOUT = "LOGOUT";
const SETUSER = "SETUSER";
const BUY_ITEM = "BUY_ITEM";
const ITEM_USE = "ITEM_USE";
const BUY_EXP = "BUY_EXP";
const SET_POINT = "SET_POINT";
const SET_RANK_LIST = "SET_RANK_LIST";
//Action Creator
// const logIn = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, () => ({}));
const setUser = createAction(SETUSER, (user) => ({ user }));
const buyItem = createAction(BUY_ITEM, (item) => ({ item }));
const ItemUse = createAction(ITEM_USE, (item) => ({ item }));
const buyExp = createAction(BUY_EXP, (item) => ({ item }));
const setPoint = createAction(SET_POINT, (point) => ({ point }));
const setRankList = createAction(SET_RANK_LIST, (list) => ({ list }));

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
            // axios.get("http://54.180.8.233:8080/loginCheck",{headers:{
            //     authorization: token
            // }})
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
                console.log("로그인체크 에러", err);
              });
          })
          .catch((err) => {
            console.log("로그인 에러", err);
          });
      })
      .catch((err) => {
        console.log("회원가입 에러", err);
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
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log(err);
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
        alert("다시 로그인 해주세요!");
        history.replace("/login");
        console.log(err);
      });
  };
};

const buyItemDB = (item) => {
  return function (dispatch, getState, { history }) {
    apis
      .buyItem(item.itemCode)
      .then((res) => {
        console.log(res);
        dispatch(buyItem(item));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const useItemDB = (item) => {
  return function (dispatch, getState, { history }) {
    console.log(item);
    apis
      .ItemUse(item)
      .then((res) => {
        console.log(res);
        dispatch(ItemUse(item));
      })
      .catch((err) => {
        console.log(err.response);
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
        console.log(err.response);
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
        console.log(err.response);
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
    // [LOGIN]: (state, action) =>
    // produce(state, (draft) => {
    //         draft.user = action.payload.user
    //     }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("authorization");
        draft.user = "";
        window.location.replace("/login");
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
  // logIn,
  logOut,
  signUpDB,
  logInDB,
  logincheckDB,
  buyItemDB,
  useItemDB,
  setPoint,
  setRankListDB,
  reportUserDB,
};

export { actionCreators };

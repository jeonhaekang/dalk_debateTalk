import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

//Action Creator
const logIn = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, () => ({}));

//initialState
const initialState = {
  user: null,
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
    console.log(user);
    await apis
      .signup(user)
      .then((res) => {
        console.log(res);
        console.log(res.headers.authorization);
      })
      .catch((err) => {
        console.log(err);
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
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("level", response.data.level);
        localStorage.setItem("point", response.data.point);
        dispatch(
          logIn({
            username: response.data.username,
            nickname: response.data.nickname,
            point: response.data.point,
            level: response.data.level,
          })
        );
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Reducer
export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.clear();
        draft.user = "";
        window.location.replace("/login");
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  logIn,
  logOut,
  signUpDB,
  logInDB,
};

export { actionCreators };

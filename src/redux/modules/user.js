import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import { replace } from "lodash";
import axios from "axios";
import { instance } from "../../shared/apis";

//Action
// const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SETUSER = 'SETUSER'

//Action Creator
// const logIn = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, () => ({}));
const setUser = createAction(SETUSER, (user) => ({ user }));

//initialState
const initialState = {
    user: null,
    userInfo: {},
}

//MiddleWare

// 회원가입 시 바로 로그인
const signUpDB = (username, password, nickname, passwordCheck) => {
    return async function (dispatch, getState, { history }) {
        const user = {
            username: username,
            password: password,
            passwordCheck: passwordCheck,
            nickname: nickname,
        }
        await apis.signup(user)
            .then(function (response) {
                const _user = {
                    username: user.username,
                    password: user.password,
                }
                apis.login(_user)
                    .then((res) => {
                        const token = res.headers.authorization;
                        setCookie(res.headers.authorization, 7);
                        // axios.get("http://54.180.8.233:8080/loginCheck",{headers:{
                        //     authorization: token
                        // }})
                        instance.get("/loginCheck", {headers: {
                            authorization: token
                        }})
                            .then((res) => {
                                dispatch(setUser(res.data))
                                history.replace('/');
                            })
                            .catch((err) => {
                                console.log("로그인체크 에러", err)
                        })
                    }).catch((err) => {
                        console.log("로그인 에러", err)
                    })
            })
            .catch((err) => {
                console.log("회원가입 에러", err)
            })
    };
};


const logInDB = (username, password) => {
    return async function (dispatch, getState, { history }) {
        const user = {
            username: username,
            password: password
        }
        await apis.login(user)
            .then(function (response) {
                console.log(response)
                setCookie(response.headers.authorization, 7);

                apis.check()
                    .then((res) => {
                        dispatch(setUser(res.data));
                        history.replace("/");
                    })
                    .catch((err) => {
                        console.log("err", err);
                    });
            })
            .catch((err) => {
                console.log(err)
            })
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


//Reducer
export default handleActions(
    {
        // [LOGIN]: (state, action) =>
        // produce(state, (draft) => {
        //         draft.user = action.payload.user
        //     }),
        [LOGOUT]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("authorization")
                draft.user = ""
                window.location.replace("/login")
            }),
        [SETUSER] : (state, action) =>
        produce(state, (draft) => {
            draft.user = action.payload.user;
            })
    },
    initialState
)


//Export Action Creator
const actionCreators = {
    // logIn,
    logOut,
    signUpDB,
    logInDB,
    logincheckDB,
};

export { actionCreators }
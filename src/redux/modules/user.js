import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/Cookie";

//Action
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SETUSER = 'SETUSER'

//Action Creator
const logIn = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, () => ({}));
const setUser = createAction(SETUSER, (userInfo) => ({ userInfo }));

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
                        console.log(res)
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


//Reducer
export default handleActions(
    {
        [LOGIN]: (state, action) =>
            produce(state, (draft) => {
                draft.user = action.payload.user
            }),
        [LOGOUT]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("authorization")
                draft.user = ""
                window.location.replace("/login")
            }),
        [SETUSER] : (state, action) =>
            produce(state, (draft) => {
                console.log("login")
            })
    },
    initialState
)


//Export Action Creator
const actionCreators = {
    logIn,
    logOut,
    signUpDB,
    logInDB,
};

export { actionCreators }
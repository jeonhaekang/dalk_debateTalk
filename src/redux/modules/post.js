import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_POST = "GET_POST";

//Action Creator
const getPost = createAction("GET_POST", (data) => ({ data }));

//initialState
const initialState = {
    postList : [],
}

//MiddleWare
const getPostDB = () => {
    return function (dispatch, getstate, {history}){
        apis.getDebate()
            .then((res) => {
                console.log("결과방 목록 가져오기 성공", res.data)
                dispatch(getPost(res.data));
            })
            .catch((err) => {
                console.log("결과창 목록 가져오기 실패", err);
            })
    };
}

//Reducer
export default handleActions(
    {
      [GET_POST] : (state, action) =>
        produce(state, (draft) => {
            draft.postList = action.payload.data;
        }),
    },
    initialState
);

//Export Action Creator
const actionCreators ={
    getPostDB,
};

export {actionCreators}
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_POST = "GET_POST";
const LOADING = "LOADING";

//Action Creator
const getPost = createAction("GET_POST", (data) => ({ data }));
const loading = createAction("LOADING", (is_loading) => ({ is_loading }));

//initialState
const initialState = {
    postList : [],
    page: 0,
    has_next: false,
    is_loading: false,
}

//MiddleWare
const getPostDB = (page) => {
    return function (dispatch, getstate, {history}){
        dispatch(loading(true));
        const size = 10
        apis.getDebate(page, size)
            .then((res) => {
                let is_next = null
                if(res.data.length < size) {
                    is_next = false
                } else {
                    res.data.pop()
                    is_next = true
                }
                const Data = {
                    postList: res.data,
                    page: page + 1,
                    next : is_next,
                }
                console.log("결과방 목록 가져오기 성공", Data)
                dispatch(getPost(Data));
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
            draft.postList.push(...action.payload.Data.postList)
            draft.page = action.payload.Data.page
            draft.has_next = action.payload.Data.next
            draft.is_loading = false
        }),
    },
    initialState
);

//Export Action Creator
const actionCreators ={
    getPostDB,
};

export {actionCreators}
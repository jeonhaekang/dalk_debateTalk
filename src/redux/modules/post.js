import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_POST = "GET_POST";
const LOADING = "LOADING";

//Action Creator
const getPost = createAction("GET_POST", (Data) => ({ Data }));
const loading = createAction("LOADING", (is_loading) => ({ is_loading }));

//initialState
const initialState = {
    postList : [],
    // 무한스크롤 관련 초기값
    page: 0, // 무한스크롤을 위한 페이지네이션 번호입니다
    has_next: false, // 다음 페이지로 넘어갈건지에 대한 boolean값입니다.
    is_loading: false, // 로딩이 중첩되어 똑같은 값이 넘어오지 않기위한 boolean값입니다.
}

//MiddleWare
const getPostDB = (page) => {
    return function (dispatch, getstate, {history}){
        dispatch(loading(true));
        const size = 3
        apis.getDebate(page, size)
            .then((res) => {
                console.log("api에서 온 res.data값",res.data)
                let is_next = null
                if(res.data.length < size) {
                    is_next = false
                } else {
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
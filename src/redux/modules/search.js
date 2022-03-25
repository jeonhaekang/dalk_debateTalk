import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";

//Action
const GET_SEARCHPOST = "GET_SEARCHPOST";
const LOADING = "LOADING";
const CLEAR = "CLEAR";

//Action Creator
const getSearchPost = createAction("GET_SEARCHPOST", (SearchData) => ({ SearchData }));
const loading = createAction("LOADING", (is_loading) => ({ is_loading }));
const clear = createAction("CLEAR", () => ({}));

//initialState
const initialState = {
    SearchPostList: [],
    // 무한스크롤 관련 초기값
    page: 0, // 무한스크롤을 위한 페이지네이션 번호입니다
    has_next: false, // 다음 페이지로 넘어갈건지에 대한 boolean값입니다.
    is_loading: false, // 로딩이 중첩되어 똑같은 값이 넘어오지 않기위한 boolean값입니다.
}

//MiddleWare
const getSearchPostDB = (keyword, page) => {
    return function (dispatch, getstate, { history }) {
        dispatch(loading(true));
        const size = 5 // 한 페이지에 몇개의 포스트를 불러올지 정합니다.
        // 파라미터로 page를 받아오고 size 변수값을 api로 받아옵니다.
        apis.getDebateKeyword(keyword, size, page)
            .then((res) => {
                let is_next = null
                // 마지막 끝단에서 데이터가 없을 때 페이지를 멈추는 if문입니다.
                if (res.data.length < size) {
                    is_next = false
                } else {
                    is_next = true
                }
                // res.data 값을 새로운 배열로 지정해주기 위한 객체입니다.
                const SearchData = {
                    postList: res.data,
                    // is_next가 true가 되면 page가 +1 됩니다.
                    page: page + 1,
                    next: is_next,
                }
                dispatch(getSearchPost(SearchData));
            })
            .catch((err) => {
                dispatch(
                    alertAction.open({
                      message: "검색 실패",
                    })
                  );
            })
    };
}

//Reducer
export default handleActions(
    {
        [GET_SEARCHPOST]: (state, action) =>
            produce(state, (draft) => {
                // Data값을 push 해주어 page수를 +1 할 때마다 push가 됩니다.
                draft.SearchPostList.push(...action.payload.SearchData.postList)
                draft.page = action.payload.SearchData.page
                draft.has_next = action.payload.SearchData.next
                draft.is_loading = false
            }),
        [CLEAR]: (state) => 
            produce(state, (draft) => {
                draft.SearchPostList = [];
            }),

    },
    initialState
);

//Export Action Creator
const actionCreators = {
    getSearchPostDB,
    clear,
};

export { actionCreators }
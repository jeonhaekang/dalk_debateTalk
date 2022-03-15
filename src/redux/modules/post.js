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
    postList: [],
    // 무한스크롤 관련 초기값
    page: 0, // 무한스크롤을 위한 페이지네이션 번호입니다
    has_next: false, // 다음 페이지로 넘어갈건지에 대한 boolean값입니다.
    is_loading: false, // 로딩이 중첩되어 똑같은 값이 넘어오지 않기위한 boolean값입니다.
}

//MiddleWare
const getPostDB = (page) => {
    return function (dispatch, getstate, { history }) {
        dispatch(loading(true));
        const size = 5 // 한 페이지에 몇개의 포스트를 불러올지 정합니다.
        // 파라미터로 page를 받아오고 size 변수값을 api로 받아옵니다.
        apis.getDebate(page, size)
            .then((res) => {
                let is_next = null
                // 마지막 끝단에서 데이터가 없을 때 페이지를 멈추는 if문입니다.
                if (res.data.length < size) {
                    is_next = false
                } else {
                    is_next = true
                }
                // res.data 값을 새로운 배열로 지정해주기 위한 객체입니다.
                const Data = {
                    postList: res.data,
                    // is_next가 true가 되면 page가 +1 됩니다.
                    page: page + 1,
                    next: is_next,
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
        [GET_POST]: (state, action) =>
            produce(state, (draft) => {
                // Data값을 push 해주어 page수를 +1 할 때마다 push가 됩니다.
                draft.postList.push(...action.payload.Data.postList)
                draft.page = action.payload.Data.page
                draft.has_next = action.payload.Data.next
                draft.is_loading = false
            }),
    },
    initialState
);

//Export Action Creator
const actionCreators = {
    getPostDB,
};

export { actionCreators }
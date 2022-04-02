import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";

//Action
const GET_ROOM = "infinityScroll/GET_ROOM";
const REFRESH = "infinityScroll/REFRESH";

//Action Creator
const getRoom = createAction(GET_ROOM, (keyword, data) => ({ keyword, data }));
const refresh = createAction(REFRESH, (keyword) => ({ keyword }));

//initialState
const initialState = {
  chat: {},
  post: {},
  search: {},
  // keyword: { list: null, page: 0, has_next: false },
  // page: 0 무한스크롤을 위한 페이지네이션 번호입니다
  // has_next: false  다음 페이지로 넘어갈건지에 대한 boolean값입니다.
};

//middleWare
const loadListDB = (page, api, keyword, category) => {
  return function (dispatch) {
    const size = 5;

    apis[api](size, page, keyword)
      .then((res) => {
        let is_next = null;
        if (res.data.length < size) {
          is_next = false;
        } else {
          is_next = true;
        }
        const data = {
          list: res.data,
          page: page + 1,
          next: is_next,
          category: category,
        };

        dispatch(getRoom(keyword, data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "에러가 발생하였습니다",
          })
        );
      });
  };
};

//Reducer
export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        const { keyword, data } = action.payload;
        if (draft[data.category][keyword]) {
          draft[data.category][keyword].list.push(...data.list);
          draft[data.category][keyword].page = data.page;
          draft[data.category][keyword].has_next = data.next;
        } else {
          draft[data.category][keyword] = {
            list: data.list,
            page: data.page,
            has_next: data.next,
          };
        }
      }),
    [REFRESH]: (state, action) =>
      produce(state, (draft) => {
        const { keyword } = action.payload;
        delete draft["chat"][keyword];
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  loadListDB,
  refresh,
};

export { actionCreators };

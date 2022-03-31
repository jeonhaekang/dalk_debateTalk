import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";

//Action
const GET_ROOM = "infinityScroll/GET_ROOM";
const CLEAR = "infinityScroll/CLEAR";
const REFRESH = "infinityScroll/REFRESH";

//Action Creator
const getRoom = createAction(GET_ROOM, (keyword, data) => ({ keyword, data }));
const clear = createAction(CLEAR, () => ({}));
const refresh = createAction(REFRESH, (keyword) => ({ keyword }));

//initialState
const initialState = {
  // keyword: { list: null, page: 0, has_next: false },
  // page: 0 무한스크롤을 위한 페이지네이션 번호입니다
  // has_next: false  다음 페이지로 넘어갈건지에 대한 boolean값입니다.
};

//middleWare
const loadListDB = (page, api, keyword) => {
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
        if (draft[keyword]) {
          draft[keyword].list.push(...data.list);
          draft[keyword].page = data.page;
          draft[keyword].has_next = data.next;
        } else {
          draft[keyword] = {
            list: data.list,
            page: data.page,
            has_next: data.next,
          };
        }
      }),
    [CLEAR]: (state, action) =>
      produce(state, (draft) => {
        return initialState;
      }),
    [REFRESH]: (state, action) =>
      produce(state, (draft) => {
        const { keyword } = action.payload;
        delete draft[keyword];
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  loadListDB,
  clear,
  refresh,
};

export { actionCreators };

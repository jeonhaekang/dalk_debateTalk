import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_ROOM = "infinityScroll/GET_ROOM";
const CLEAR = "infinityScroll/CLEAR";

//Action Creator
const getRoom = createAction(GET_ROOM, (data) => ({ data }));
const clear = createAction(CLEAR, () => ({}));

//initialState
const initialState = {
  list: [],
  page: 0, // 무한스크롤을 위한 페이지네이션 번호입니다
  has_next: false, // 다음 페이지로 넘어갈건지에 대한 boolean값입니다.
};

//middleWare
const loadListDB = (page, api, keyword) => {
  return function (dispatch, getState, { history }) {
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

        dispatch(getRoom(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Reducer
export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.data.list);
        draft.page = action.payload.data.page;
        draft.has_next = action.payload.data.next;
      }),
    [CLEAR]: (state, action) =>
      produce(state, (draft) => {
        return initialState;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  loadListDB,
  clear,
};

export { actionCreators };

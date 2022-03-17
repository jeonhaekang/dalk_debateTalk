import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_ROOM = "infinityScrollDevelop/GET_ROOM";
const CLEAR = "infinityScrollDevelop/CLEAR";

//Action Creator
const getRoom = createAction(GET_ROOM, (data, category) => ({
  data,
  category,
}));
const clear = createAction(CLEAR, () => ({}));

//initialState
const initialState = {
  // list: [],
  // page: 0, // 무한스크롤을 위한 페이지네이션 번호입니다
  // has_next: false, // 다음 페이지로 넘어갈건지에 대한 boolean값입니다.
};

//middleWare
const loadListDB = (page, api, category) => {
  return function (dispatch, getState, { history }) {
    const size = 5;

    apis[api](size, page, category)
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

        dispatch(getRoom(data, category));
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
        const category = action.payload.category;
        const data = action.payload.data;

        draft[category] = {
          list: { ...draft[category], ...data.list },
          page: data.page,
          has_next: data.next,
        };
        // draft.list.push(...action.payload.data.list);
        // draft.page = action.payload.data.page;
        // draft.has_next = action.payload.data.next;
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

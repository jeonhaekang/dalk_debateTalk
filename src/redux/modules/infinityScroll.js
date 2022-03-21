import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

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
  전체: { list: [], page: 0, has_next: false },
  음식: { list: [], page: 0, has_next: false },
  운동: { list: [], page: 0, has_next: false },
  게임: { list: [], page: 0, has_next: false },
  연애: { list: [], page: 0, has_next: false },
  유머: { list: [], page: 0, has_next: false },
  헬프: { list: [], page: 0, has_next: false },
  망상: { list: [], page: 0, has_next: false },
  정치: { list: [], page: 0, has_next: false },
  기타: { list: [], page: 0, has_next: false },
  // page: 0 무한스크롤을 위한 페이지네이션 번호입니다
  // has_next: false  다음 페이지로 넘어갈건지에 대한 boolean값입니다.
};

const initialData = {
  list: [],
  page: 0,
  has_next: false,
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

        dispatch(getRoom(keyword, data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const refreshDB = (api, keyword) => {
  return async function (dispatch, getState, { history }) {
    dispatch(refresh(keyword));
    dispatch(loadListDB(0, api, keyword));
  };
};

//Reducer
export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        const { keyword, data } = action.payload;
        draft[keyword].list.push(...data.list);
        draft[keyword].page = data.page;
        draft[keyword].has_next = data.next;
      }),
    [CLEAR]: (state, action) =>
      produce(state, (draft) => {
        return initialState;
      }),
    [REFRESH]: (state, action) =>
      produce(state, (draft) => {
        const { keyword } = action.payload;
        draft[keyword] = initialData;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  loadListDB,
  clear,
  refreshDB,
};

export { actionCreators };

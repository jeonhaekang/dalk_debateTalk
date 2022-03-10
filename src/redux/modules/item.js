import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//Action
const SET_ITEM_STATE = "SET_ITEM_STATE";
const SET_USER = "SET_USER";
const CLEAR = "CREAR";

//Action Creator
const setItemState = createAction(SET_ITEM_STATE, (state) => ({ state }));
const setUser = createAction(SET_USER, (item, user) => ({ item, user }));
const clear = createAction(CLEAR, () => ({}));

//initialState
const initialState = {
  itemState: false, // 아이템 사용 가능한지 상태
  onlyMe: null, // onlyMe아이템을 발동시킨 유저
  myName: null, // myName아이템을 발동시킨 유저
  papago: null, // papago아이템을 발동시킨 유저
  reverse: null, // reverse아이템을 발동시킨 유저
};

//MiddleWare
export default handleActions(
  {
    [SET_ITEM_STATE]: (state, action) =>
      produce(state, (draft) => {
        draft.itemState = action.payload.state;
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft[action.payload.item] = action.payload.user;
      }),
    [CLEAR]: (state) =>
      produce(state, (draft) => {
        draft.onlyMe = null;
        draft.myName = null;
        draft.papago = null;
        draft.reverse = null;
        draft.itemState = true;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  setItemState,
  setUser,
  clear,
};

export { actionCreators };

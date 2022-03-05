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
  itemState: false,
  onlyMe: null,
  myName: null,
};

//MiddleWare
export default handleActions(
  {
    [SET_ITEM_STATE]: (state, action) =>
      produce(state, (draft) => {
        console.log("실행", action.payload.state);
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

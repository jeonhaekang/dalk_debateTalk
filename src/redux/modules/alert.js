import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//Action
const OPEN = "alert/OPEN";
const CLOSE = "alert/CLOSE";

//Action Creator
const open = createAction(
  OPEN,
  (type, message, history = () => {}, action = () => {}) => ({
    type,
    message,
    history,
    action,
  })
);
const close = createAction(CLOSE, () => ({}));

//initialState
const initialState = {
  type: "alert",
  openState: false,
  message: "",
  action: () => {},
  history: () => {},
};

//Reducer
export default handleActions(
  {
    [OPEN]: (state, action) =>
      produce(state, (draft) => {
        draft.type = action.payload.type;
        draft.openState = true;
        draft.message = action.payload.message;
        draft.action = action.payload.action;
        draft.history = action.payload.history;
      }),
    [CLOSE]: (state) =>
      produce(state, (draft) => {
        draft.type = "alert";
        draft.openState = false;
        draft.message = "";
        draft.action = () => {};
        draft.history = () => {};
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  open,
  close,
};

export { actionCreators };

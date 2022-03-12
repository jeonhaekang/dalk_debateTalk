import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//Action
const OPEN = "alert/OPEN";
const CLOSE = "alert/CLOSE";

//Action Creator
const open = createAction(OPEN, (message) => ({ message }));
const close = createAction(CLOSE, () => ({}));

//initialState
const initialState = {
  openState: false,
  message: "",
};

//Reducer
export default handleActions(
  {
    [OPEN]: (state, action) =>
      produce(state, (draft) => {
        draft.openState = true;
        draft.message = action.payload.message;
      }),
    [CLOSE]: (state) =>
      produce(state, (draft) => {
        draft.openState = false;
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

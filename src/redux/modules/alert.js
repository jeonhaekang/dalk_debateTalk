import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//Action
const OPEN = "alert/OPEN";
const CLOSE = "alert/CLOSE";

//Action Creator
const open = createAction(OPEN, (data) => ({ data }));
const close = createAction(CLOSE, () => ({}));

//initialState
const initialState = {
  data: {
    type: "alert",
    openState: false,
    message: "",
    action: () => {},
    history: () => {},
  },
};

//Reducer
export default handleActions(
  {
    [OPEN]: (state, action) =>
      produce(state, (draft) => {
        draft.data = {
          ...initialState.data,
          openState: true,
          ...action.payload.data,
        };
      }),
    [CLOSE]: (state) =>
      produce(state, (draft) => {
        draft.data = initialState.data;
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

import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//Action
const START = "spinner/START";
const END = "spinner/END";

//Action Creator
const start = createAction(START, () => ({}));
const end = createAction(END, () => ({}));

//initialState
const initialState = {
  is_loaded: false,
};

//Reducer
export default handleActions(
  {
    [START]: (state) =>
      produce(state, (draft) => {
        draft.is_loaded = true;
      }),
    [END]: (state) =>
      produce(state, (draft) => {
        draft.is_loaded = false;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  start,
  end,
};

export { actionCreators };

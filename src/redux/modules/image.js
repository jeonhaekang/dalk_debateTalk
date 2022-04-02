import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import defaultImage from "../../image/shared/defaultImage.svg";

// Action
const SET_PREVIEW = "SET_PREVIEW";
const SET_FILE = "SET_FILE";
const CLEAR = "CLEAR";

// Action Creator
const setPreview = createAction(SET_PREVIEW, (image) => ({ image }));
const setFile = createAction(SET_FILE, (image) => ({ image }));
const clear = createAction(CLEAR, () => ({}));

// initialState
const initialState = {
  preview: defaultImage,
  file: null,
};

// Reducer
export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft["preview"] = action.payload.image;
      }),
    [SET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft["file"] = action.payload.image;
      }),
    [CLEAR]: (state) =>
      produce(state, (draft) => {
        return initialState;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  setPreview,
  setFile,
  clear,
};

export { actionCreators };

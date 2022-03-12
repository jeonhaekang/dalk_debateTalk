import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import UploadDefault from "../../image/UploadDefault.png";

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
  image: {
    preview: UploadDefault,
    file: null,
  },
};

// Reducer
export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.image["preview"] = action.payload.image;
      }),
    [SET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.image["file"] = action.payload.image;
      }),
    [CLEAR]: (state) =>
      produce(state, (draft) => {
        draft.image["preview"] = null;
        draft.image["file"] = null;
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

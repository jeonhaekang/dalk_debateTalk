import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";

// Action
const GET_ONE_POST = "GET_ONE_POST";

// Action Creator
const getOnePost = createAction(GET_ONE_POST, (boardId, data) => ({
  boardId,
  data,
}));

// initialState
const initialState = {
  postData: {},
};

//MiddleWare
const getOnePostDB = (boardId) => {
  //게시물 디테일 정보 가져오기
  return function (dispatch, getState, { history }) {
    apis
      .getOneDebate(boardId)
      .then((res) => {
        dispatch(getOnePost(boardId, res.data));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "게시물 불러오기에 실패하였습니다.",
            history: () => history.goBack(),
          })
        );
      });
  };
};

const postReportDB = (boardId) => {
  //배너 목록 가져오기
  return function (dispatch) {
    apis
      .warningDebate(boardId)
      .then(() => {
        dispatch(
          alertAction.open({
            message: "신고처리가 완료되었습니다",
          })
        );
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "이미 신고를 하셨습니다",
          })
        );
        return;
      });
  };
};

// Reducer
export default handleActions(
  {
    [GET_ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postData[action.payload.boardId] = action.payload.data;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  getOnePostDB,
  postReportDB,
};

export { actionCreators };

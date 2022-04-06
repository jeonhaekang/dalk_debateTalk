import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";

//Action
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";
const GET_AGREE = "GET_AGREE";
const GET_DISAGREE = "GET_DISAGREE";
const PUSH_AGREE = "PUSH_AGREE";
const PUSH_DISAGREE = "PUSH_DISAGREE";

//Action Creator
const getComment = createAction(GET_COMMENTS, (data) => ({ data }));
const addComment = createAction(ADD_COMMENT, (boardId, comment) => ({
  boardId,
  comment,
}));
const delComment = createAction(DEL_COMMENT, (commentId) => ({ commentId }));
const getAgree = createAction(GET_AGREE, (agreeUserList) => ({
  agreeUserList,
}));
const getDisAgree = createAction(GET_DISAGREE, (disagreeUserList) => ({
  disagreeUserList,
}));
const pushAgree = createAction(PUSH_AGREE, (userId, index) => ({
  userId,
  index,
}));
const pushDisAgree = createAction(PUSH_DISAGREE, (userId, index) => ({
  userId,
  index,
}));

//initialState
const initialState = {
  //초기값 선언을 객체형이 아닌 배열로 선언해야함
  commentList: [
    {
      userInfo: {
        userId: 1,
        username: "username",
        nickname: "nickname",
        point: 0,
        ex: 0,
        role: "role",
        item: {
          bigFont: 1,
          onlyMe: 2,
          myName: 1,
        },
      },
      commentId: 1,
      comment: "comment",
      agreeCnt: 2,
      agreeUserList: [],
      disagreeCnt: 3,
      disagreeUserList: [],
      warnCnt: 1,
      warnUserList: [],
      isLike: false,
      createdAt: "2022-03-01-20:00",
    },
  ],
};

//MiddleWare
const getCommentDB = (boardId) => {
  return function (dispatch) {
    apis
      .getComment(boardId)
      .then((res) => {
        dispatch(getComment(res.data));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "댓글 가져오기 실패",
          })
        );
      });
  };
};

const addCommentDB = (boardId, comment) => {
  return function (dispatch) {
    if (!boardId) {
      return;
    }
    apis
      .addComment(boardId, comment)
      .then((res) => {
        dispatch(getCommentDB(boardId));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "댓글 추가 실패",
          })
        );
      });
  };
};

const delCommentDB = (commentId) => {
  return async function (dispatch) {
    await apis
      .deleteComment(commentId)
      .then(() => {
        dispatch(delComment(commentId));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "댓글 삭제 실패",
          })
        );
      });
  };
};

const pushAgreeDB = (commentId, index) => {
  return function (dispatch, getState) {
    const userId = getState().user.user.userId;

    apis
      .agreeComment(commentId)
      .then(() => {
        dispatch(pushAgree(userId, index));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "찬성 버튼 에러",
          })
        );
      });
  };
};

const pushDisAgreeDB = (commentId, index) => {
  return function (dispatch, getState) {
    const userId = getState().user.user.userId;

    apis
      .disagreeComment(commentId)
      .then(() => {
        dispatch(pushDisAgree(userId, index));
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "반대 버튼 에러",
          })
        );
      });
  };
};

const commentWarnDB = (commentId) => {
  return function (dispatch) {
    apis
      .warningComment(commentId)
      .then(() => {
        dispatch(
          alertAction.open({
            message: "덧글을 신고하였습니다.",
          })
        );
      })
      .catch(() => {
        dispatch(
          alertAction.open({
            message: "이미 신고를 하셨습니다",
          })
        );
      });
  };
};

//Reducer
export default handleActions(
  {
    [GET_COMMENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.data;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList[action.payload.boardId].unshift(
          action.payload.comment
        );
      }),
    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const new_comment = draft.commentList.filter(
          (c) => c.commentId !== action.payload.commentId
        );
        draft.commentList = new_comment;
      }),
    [GET_AGREE]: (state, action) =>
      produce(state, (draft) => {
        draft.agreeUserList = action.payload.agreeUserList;
      }),
    [GET_DISAGREE]: (state, action) =>
      produce(state, (draft) => {
        draft.disagreeUserList = action.payload.disagreeUserList;
      }),
    [PUSH_AGREE]: (state, action) =>
      produce(state, (draft) => {
        const userId = action.payload.userId;
        const index = action.payload.index;
        const agree = draft.commentList[index].agreeUserList.findIndex((el) => {
          return el === userId;
        });
        const disagree = draft.commentList[index].disagreeUserList.findIndex(
          (el) => {
            return el === userId;
          }
        );
        if (agree !== -1) {
          draft.commentList[index].agreeUserList.splice(agree, 1);
        } else {
          if (disagree !== -1) {
            draft.commentList[index].disagreeUserList.splice(agree, 1);
          }
          draft.commentList[index].agreeUserList.push(userId);
        }
      }),
    [PUSH_DISAGREE]: (state, action) =>
      produce(state, (draft) => {
        const userId = action.payload.userId;
        const index = action.payload.index;
        const agree = draft.commentList[index].agreeUserList.findIndex((el) => {
          return el === userId;
        });
        const disagree = draft.commentList[index].disagreeUserList.findIndex(
          (el) => {
            return el === userId;
          }
        );
        if (disagree !== -1) {
          draft.commentList[index].disagreeUserList.splice(agree, 1);
        } else {
          if (agree !== -1) {
            draft.commentList[index].agreeUserList.splice(agree, 1);
          }
          draft.commentList[index].disagreeUserList.push(userId);
        }
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  getComment,
  getCommentDB,
  addComment,
  addCommentDB,
  delComment,
  delCommentDB,
  getAgree,
  getDisAgree,
  pushAgree,
  pushAgreeDB,
  pushDisAgree,
  pushDisAgreeDB,
  commentWarnDB,
};

export { actionCreators };

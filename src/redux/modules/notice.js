import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";

//Action
const GET_NOTICE = "GET_NOTICE";
const ADD_NOTICE = "ADD_NOTICE";
const UPDATE_NOTICE = "UPDATE_NOTICE";
const DEL_NOTICE = "DEL_NOTICE";

//Action Creator
const getNotice = createAction(GET_NOTICE, (notices) => ({ notices }));
const addNotice = createAction(ADD_NOTICE, (notice) => ({ notice }));
const updateNotice = createAction(UPDATE_NOTICE, (noticeId, notice) => ({
  noticeId,
  notice,
}));
const delNotice = createAction(DEL_NOTICE, (noticeId) => ({ noticeId }));

//initialState
const initialState = {
  //초기값 선언을 객체형이 아닌 배열로 선언해야함
  NoticeList: [],
};

//MiddleWare
const getNoticeDB = () => {
  //배너 목록 가져오기
  return function (dispatch, getState, { history }) {
    apis
      .getNotice()
      .then((res) => {
        dispatch(getNotice(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "공지사항 가져오기 실패",
          })
        );
      });
  };
};

const addNoticeDB = (title, content) => {
  //배너 추가하기
  return function (dispatch, getState, { history }) {
    apis
      .postNotice(title, content)
      .then((res) => {
        dispatch(addNotice(title, content));
        dispatch(getNoticeDB());
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "공지사항 추가 실패",
          })
        );
      });
  };
};

const updateNoticeDB = (noticeId, title, content) => {
  return function (dispatch, getState, { history }) {
    apis
      .updateNotice(noticeId, title, content)
      .then((res) => {
        dispatch(updateNotice(noticeId, title, content));
        dispatch(getNoticeDB());
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "공지사항 수정 실패",
          })
        );
      });
  };
};

const delNoticeDB = (noticeId) => {
  //배너 삭제하기
  return function (dispatch, getState, { history }) {
    apis
      .delNotice(noticeId)
      .then((res) => {
        dispatch(delNotice(noticeId));
        dispatch(getNoticeDB());
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "공지사항 삭제 실패",
          })
        );
      });
  };
};

//Reducer
export default handleActions(
  {
    [GET_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        draft.NoticeList = action.payload.notices;
      }),
    [ADD_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        draft.NoticeList.unshift(action.payload.notice);
      }),
    [UPDATE_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        const noticeId = action.payload.noticeId;
        draft.NoticeList = draft.NoticeList.map((el) => {
          if (el.noticeId === parseInt(noticeId)) {
            return { ...el, ...action.payload.notice };
          }
          return el;
        });
      }),
    [DEL_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        draft.NoticeList = draft.NoticeList.filter((el) => {
          if (el.noticeId === action.payload.noticeId) {
            return false;
          } else return true;
        });
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  getNoticeDB,
  updateNoticeDB,
  addNoticeDB,
  delNoticeDB,
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as userAction } from "./user";
import { actionCreators as alertAction } from "./alert";
import axios from "axios";

//Action
const SET_ROOM_LIST = "chat/SET_ROOM_LIST";
const SET_CURRENT_ROOM = "chat/SET_CURRENT_ROOM";
const CURRENT_ROOM_CLEAR = "chat/CURRENT_ROOM_CLEAR";
const SET_MESSAGE = "chat/SET_MESSAGE";
const NEW_MESSAGE = "chat/NEW_MESSAGE";
const LOAD_USER_LIST = "chat/LOAD_USER_LIST";
const ENTER_USER = "chat/ENTER_USER";
const EXIT_USER = "chat/EXIT_USER";
const VOTE = "chat/VOTE";

//Action Creator
const setRoomList = createAction(SET_ROOM_LIST, (list) => ({ list }));
const setCurrentRoom = createAction(SET_CURRENT_ROOM, (data) => ({ data }));
const currentRoomClear = createAction(CURRENT_ROOM_CLEAR, () => ({}));
const setMessage = createAction(SET_MESSAGE, (messages) => ({ messages }));
const newMessage = createAction(NEW_MESSAGE, (message) => ({ message }));
const loadUserList = createAction(LOAD_USER_LIST, (userList) => ({
  userList,
}));
const enterUser = createAction(ENTER_USER, (user) => ({ user }));
const exitUser = createAction(EXIT_USER, (user) => ({ user }));
const vote = createAction(VOTE, (data) => ({ data }));

//initialState
const initialState = {
  roomList: null,
  currentRoom: { roomInfo: null, messageLog: null, users: [] },
  itemState: false,
};
const currentInitial = {
  roomInfo: null,
  messageLog: null,
  users: [],
};

//MiddleWare
const mainRoomListDB = (state) => {
  // 메인 방 목록 가져오기
  return function (dispatch, { history }) {
    apis
      .mainRoomList(state)
      .then((res) => {
        dispatch(setRoomList(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "채팅방 목록 불러오기에 실패하였습니다.",
            history: () => history.push("/"),
          })
        );
      });
  };
};

const loadCategoryRoomDB = (category) => {
  // 모든 방 목록 가져오기
  return function (dispatch) {
    apis
      .loadCategoryRoom(category)
      .then((res) => {
        dispatch(setRoomList(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "에러가 발생하였습니다",
          })
        );
      });
  };
};

const voteDB = (roomId, topic, point) => {
  return function (dispatch) {
    apis
      .vote(roomId, { topic: topic, point: point })
      .then((res) => {
        dispatch(userAction.setPoint(-1 * point));

        const data = {
          userPick: topic,
          userPoint: point,
        };
        dispatch(vote(data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: err.response.data.message,
          })
        );
      });
  };
};

const createRoomDB = (data) => {
  // 채팅 방 생성
  return function (dispatch, getState, { history }) {
    const image = getState().image;

    const formdata = new FormData();
    image.file && formdata.append("image", image.file);
    formdata.append(
      "debate",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    apis
      .createRoom(formdata)
      .then((res) => {
        history.replace("/chatroom/" + res.data.roomId);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          dispatch(
            alertAction.open({
              message: err.message,
            })
          );
        }
      });
  };
};

const getOneRoomDB = (roomId) => {
  // 방 상세정보 가져오기
  return function (dispatch) {
    apis
      .getOneRoom(roomId)
      .then((res) => {
        dispatch(setCurrentRoom(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "에러가 발생하였습니다",
          })
        );
      });
  };
};

const loadMessageLogDB = (roomId) => {
  return function (dispatch) {
    apis
      .messageLog(roomId)
      .then((res) => {
        dispatch(setMessage(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "에러가 발생하였습니다",
          })
        );
      });
  };
};

const loadUserListDB = (roomId) => {
  return function (dispatch) {
    apis
      .roomUsers(roomId)
      .then((res) => {
        dispatch(loadUserList(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "에러가 발생하였습니다",
          })
        );
      });
  };
};

const reportRoomDB = (roomId) => {
  return function (dispatch) {
    apis
      .reportRoom(roomId)
      .then(() => {
        dispatch(alertAction.open({ message: "채팅방을 신고하였습니다" }));
      })
      .catch((err) => {
        dispatch(alertAction.open({ message: err.response.data.message }));
      });
  };
};

//Reducer
export default handleActions(
  {
    // 채팅방 목록 설정
    [SET_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = action.payload.list;
      }),
    [SET_CURRENT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom.roomInfo = action.payload.data;
        draft.itemState = false;
      }),
    [CURRENT_ROOM_CLEAR]: (state) =>
      produce(state, (draft) => {
        draft.currentRoom = currentInitial;
      }),
    [SET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom.messageLog = action.payload.messages;
      }),
    [NEW_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom.messageLog.push(action.payload.message);
      }),
    [LOAD_USER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom.users = action.payload.userList;
      }),
    [ENTER_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom.users.push(action.payload.user);
      }),
    [EXIT_USER]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.currentRoom.users.findIndex(
          (el) => el.userId === action.payload.user.userId
        );
        draft.currentRoom.users.splice(idx, 1);
      }),
    [VOTE]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom.roomInfo.userVote = action.payload.data;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  setCurrentRoom,
  createRoomDB,
  getOneRoomDB,
  mainRoomListDB,
  loadCategoryRoomDB,
  voteDB,
  currentRoomClear,
  loadMessageLogDB,
  newMessage,
  loadUserListDB,
  enterUser,
  exitUser,
  reportRoomDB,
};

export { actionCreators };

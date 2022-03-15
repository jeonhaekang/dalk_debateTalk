import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as imageAction } from "./image";
import user, { actionCreators as userAction } from "./user";
import { actionCreators as alertAction } from "./alert";
import moment from "moment";
import axios from "axios";
import { history } from "../configStore";

//Action
const SET_ROOM = "SET_ROOM";
const GET_ROOM = "GET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";
const DELETE_ROOM = "CREATE_RODELETE_ROOMOM";
const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";
const CLEAR = "CLEAR";
const SET_MESSAGE = "SET_MESSAGE";
const NEW_MESSAGE = "NEW_MESSAGE";
const LOAD_USER_LIST = "LOAD_USER_LIST";
const ENTER_USER = "ENTER_USER";
const EXIT_USER = "EXIT_USER";

//Action Creator
const setRoom = createAction(SET_ROOM, (list) => ({ list }));
const getRoom = createAction(GET_ROOM, (data) => ({ data }));
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const deleteRoom = createAction(DELETE_ROOM, (roomId) => ({ roomId }));
const setCurrentRoom = createAction(SET_CURRENT_ROOM, (data) => ({ data }));
const loading = createAction("LOADING", (is_loading) => ({ is_loading }));
const clear = createAction("CLEAR", () => ({}));
const setMessage = createAction("SET_MESSAGE", (messages) => ({ messages }));
const newMessage = createAction("NEW_MESSAGE", (message) => ({ message }));
const loadUserList = createAction("LOAD_USER_LIST", (userList) => ({
  userList,
}));
const enterUser = createAction("ENTER_USER", (user) => ({ user }));
const exitUser = createAction("EXIT_USER", (user) => ({ user }));

//initialState
const initialState = {
  is_loaded: false,
  roomList: [],
  currentRoom: { roomInfo: null, messageLog: [], users: [] },
  itemState: false,

  page: 0, // 무한스크롤을 위한 페이지네이션 번호입니다
  has_next: false, // 다음 페이지로 넘어갈건지에 대한 boolean값입니다.
  is_loading: false, // 로딩이 중첩되어 똑같은 값이 넘어오지 않기위한 boolean값입니다.
};

const roomInitialState = {
  warnCnt: 0,
  warnUserList: null,
};

//MiddleWare
const loadMainRoomDB = () => {
  // 메인 방 목록 가져오기
  return function (dispatch, getState, { history }) {
    apis
      .loadMainRoom()
      .then((res) => {
        dispatch(setRoom(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const loadAllRoomDB = (page) => {
  // 모든 방 목록 가져오기
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const size = 5;

    apis
      .loadAllRoom(size, page)
      .then((res) => {
        let is_next = null;
        if (res.data.length < size) {
          is_next = false;
        } else {
          is_next = true;
        }
        const data = {
          roomList: res.data,
          page: page + 1,
          next: is_next,
        };

        dispatch(getRoom(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const loadCategoryRoomDB = (category) => {
  // 모든 방 목록 가져오기
  return function (dispatch, getState, { history }) {
    apis
      .loadCategoryRoom(category)
      .then((res) => {
        dispatch(setRoom(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const voteDB = (roomId, topic, point) => {
  return function (dispatch, getState, { history }) {
    apis
      .vote(roomId, { topic: topic, point: point })
      .then((res) => {
        dispatch(userAction.setPoint(-1 * point));
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
    const image = getState().image.image;

    const formdata = new FormData();
    image.file && formdata.append("image", image.file);
    formdata.append(
      "debate",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    apis
      .createRoom(formdata)
      .then((res) => {
        const user = getState().user.user;
        const setData = {
          ...roomInitialState,
          ...data,
          roomId: res.data.roomId,
          userInfo: user,
          filePath: image.preview,
          createdAt: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
          restTime: data.time ? 1200 : 3600,
        };

        dispatch(createRoom(setData));
        dispatch(imageAction.clear());
        history.push("/chatroom/" + res.data.roomId);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(err.message);
        }
        console.log(err.response);
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
        console.log(err.response);
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
        console.log(err.response);
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
        console.log(err.response);
      });
  };
};

//Reducer
export default handleActions(
  {
    [SET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = action.payload.list;
      }),
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList.unshift(action.payload.room);
      }),
    [DELETE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = draft.roomList.filter(
          (el) => el.roomId !== action.payload.roomId
        );
      }),
    [SET_CURRENT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom.roomInfo = action.payload.data;
        draft.itemState = false;
      }),
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList.push(...action.payload.data.roomList);
        draft.page = action.payload.data.page;
        draft.has_next = action.payload.data.next;
        draft.is_loading = false;
      }),
    [CLEAR]: (state) =>
      produce(state, (draft) => {
        draft.roomList = [];
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
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  setCurrentRoom,
  createRoomDB,
  loadAllRoomDB,
  getOneRoomDB,
  deleteRoom,
  loadMainRoomDB,
  loadCategoryRoomDB,
  voteDB,
  clear,
  loadMessageLogDB,
  newMessage,
  loadUserListDB,
  enterUser,
  exitUser,
};

export { actionCreators };

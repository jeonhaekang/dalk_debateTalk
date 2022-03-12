import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as imageAction } from "./image";
import { actionCreators as userAction } from "./user";

//Action
const IS_LOADED = "IS_LOADED";
const SET_ROOM = "SET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";
const DELETE_ROOM = "CREATE_RODELETE_ROOMOM";
const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";
const VOTE = "VOTE";

//Action Creator
const setRoom = createAction(SET_ROOM, (list) => ({ list }));
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const deleteRoom = createAction(DELETE_ROOM, (roomId) => ({ roomId }));
const setCurrentRoom = createAction(SET_CURRENT_ROOM, (data) => ({ data }));
const vote = createAction(VOTE, (topic, point) => ({ topic, point }));

//initialState
const initialState = {
  is_loaded: false,
  roomList: [],
  currentRoom: null,
  itemState: false,
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
const loadAllRoomDB = () => {
  // 모든 방 목록 가져오기
  return function (dispatch, getState, { history }) {
    apis
      .loadAllRoom()
      .then((res) => {
        dispatch(setRoom(res.data));
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
      });
  };
};

const createRoomDB = (data) => {
  // 채팅 방 생성
  return function (dispatch, getState, { history }) {
    console.log("data:", data);
    const image = getState().image.image;
    console.log(image);
    const formdata = new FormData();

    image.file && formdata.append("image", image.file);
    formdata.append(
      "debate",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    console.log("진입");

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
          createdAt: new Date(),
          restTime: data.time ? 1200 : 3600,
        };

        dispatch(createRoom(setData));
        dispatch(imageAction.clear());
        history.push("/chatroom/" + res.data.roomId);
      })
      .catch((err) => {
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
        console.log(action.payload.roomId);
        draft.roomList = draft.roomList.filter(
          (el) => el.roomId !== action.payload.roomId
        );
      }),
    [SET_CURRENT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom = action.payload.data;
        draft.itemState = false;
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
};

export { actionCreators };

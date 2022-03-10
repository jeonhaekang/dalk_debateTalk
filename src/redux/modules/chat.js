import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as imageAction } from "./image";

//Action
const IS_LOADED = "IS_LOADED";
const SET_ROOM = "SET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";
const DELETE_ROOM = "CREATE_RODELETE_ROOMOM";
const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";

//Action Creator
const setRoom = createAction(SET_ROOM, (list, rooms) => ({ list, rooms }));
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const deleteRoom = createAction(DELETE_ROOM, (roomId) => ({ roomId }));
const setCurrentRoom = createAction(SET_CURRENT_ROOM, (data) => ({ data }));

//initialState
const initialState = {
  is_loaded: false,
  mainRoomList: [],
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
        dispatch(setRoom("mainRoomList", res.data));
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

const createRoomDB = (data) => {
  // 채팅 방 생성
  return function (dispatch, getState, { history }) {
    console.log("data:", data);
    const image = getState().image.image;
    const formdata = new FormData();
    formdata.append("image", image.file);
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
          restTime: data.time ? 1200 : 3600,
        };

        dispatch(createRoom(setData));
        dispatch(imageAction.clear());
        history.push("/chatroom/" + res.data.roomId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getOneRoomDB = (roomId) => {
  // 방 상세정보 가져오기
  return function (dispatch) {
    apis
      .getOneRoom(roomId)
      .then((res) => {
        console.log(res.data);
        dispatch(setCurrentRoom(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Reducer
export default handleActions(
  {
    [SET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft[action.payload.list] = action.payload.rooms;
      }),
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList.unshift(action.payload.room);
        draft.mainRoomList.unshift(action.payload.room);
      }),
    [DELETE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = draft.roomList.filter((el) => {
          if (el.roomId === action.payload.roomId) {
            return false;
          } else return true;
        });
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
};

export { actionCreators };

import { createAction, handleAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const SET_ROOM = "SET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";
const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";
const SET_ITEM_STATE = "SET_ITEM_STATE";

//Action Creator
const setRoom = createAction(SET_ROOM, (rooms) => ({ rooms }));
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const setCurrentRoom = createAction(SET_CURRENT_ROOM, (data) => ({ data }));
const setItemState = createAction(SET_ITEM_STATE, (state) => ({ state }));

//initialState
const initialState = {
  roomList: [],
  currentRoom: null,
  itemState: false,
};

//MiddleWare
const loadAllRoomDB = () => {
  // 모든 방 목록 가져오기
  return function (dispatch, getState, { history }) {
    apis
      .loadAllRoom()
      .then((res) => {
        console.log(res.data);
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
    console.log(data);

    apis
      .createRoom(data)
      .then((res) => {
        const user = getState().user.user;
        console.log(res);
        dispatch(
          createRoom({ ...data, chatRoomId: res.data.roomId, userInfo: user })
        );
        history.replace("/chatroom/" + res.data.roomId);
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
        draft.roomList = action.payload.rooms;
      }),
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList.push(action.payload.room);
      }),
    [SET_CURRENT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom = action.payload.data;
        draft.itemState = false;
      }),
    [SET_ITEM_STATE]: (state, action) =>
      produce(state, (draft) => {
        console.log("실행", action.payload.state);
        draft.itemState = action.payload.state;
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  setCurrentRoom,
  setItemState,
  createRoomDB,
  loadAllRoomDB,
  getOneRoomDB,
};

export { actionCreators };

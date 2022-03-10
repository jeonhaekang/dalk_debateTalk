import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const IS_LOADED = "IS_LOADED";
const SET_ROOM = "SET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";
const DELETE_ROOM = "CREATE_RODELETE_ROOMOM";
const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";

//Action Creator
const is_loaded = createAction(IS_LOADED, (rooms) => ({ rooms }));
const setRoom = createAction(SET_ROOM, (rooms) => ({ rooms }));
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const deleteRoom = createAction(DELETE_ROOM, (roomId) => ({ roomId }));
const setCurrentRoom = createAction(SET_CURRENT_ROOM, (data) => ({ data }));

//initialState
const initialState = {
  is_loaded: false,
  roomList: [],
  currentRoom: null,
  itemState: false,
};

//MiddleWare
const loadMainRoomDB = () => {
  // 메인 방 목록 가져오기
  return function (dispatch, getState, { history }) {
    dispatch(is_loaded());
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
    dispatch(is_loaded());
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
    dispatch(is_loaded());
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
    apis
      .createRoom({ ...data })
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
    dispatch(is_loaded());
    apis
      .getOneRoom(roomId)
      .then((res) => {
        // apis
        //   .getVoteUser(roomId)
        //   .then((res) => {
        //     // console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
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
    [IS_LOADED]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loaded = true;
      }),
    [SET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = action.payload.rooms;
        draft.is_loaded = false;
      }),
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList.push(action.payload.room);
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
        draft.is_loaded = false;
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

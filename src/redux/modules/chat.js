import { createAction, handleAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const SET_ROOM = "SET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";

//Action Creator
const setRoom = createAction(SET_ROOM, (rooms) => ({ rooms }));
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));

//initialState
const initialState = {
  roomList: [],
  messageList: [],
};

//MiddleWare
const loadAllRoomDB = () => {
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
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  createRoomDB,
  loadAllRoomDB,
};

export { actionCreators };

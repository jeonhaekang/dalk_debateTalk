import { createAction, handleAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const LOAD_ALL_ROOM = "LOAD_ALL_ROOM";
const CREATE_ROOM = "CREATE_ROOM";

//Action Creator
const loadAllRoom = createAction(LOAD_ALL_ROOM, (rooms) => ({ rooms }));
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));

//initialState
const initialState = {
  roomList: [],
};

//MiddleWare
const loadAllRoomDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .loadAllRoom()
      .then((res) => {
        dispatch(loadAllRoom(res.data));
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
        dispatch(createRoom({ ...data, ...res.data, userInfo: user }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Reducer
export default handleActions(
  {
    [LOAD_ALL_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = action.payload.rooms;
      }),
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList.unshift(action.payload.room);
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

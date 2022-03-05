import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../../elements/Grid";
import { actionCreators } from "../../redux/modules/chat";
import CountDownTimer from "./CountDownTimer";

const RoomInfo = ({ roomId }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.getOneRoomDB(roomId));
    // 방에 들어오면 데이터 업데이트
    return () => {
      dispatch(actionCreators.setCurrentRoom(null));
      // 방에서 나갈 때 정보 초기화
    };
  }, []);

  const roomInfo = useSelector((state) => state.chat.currentRoom);

  return (
    <>
      {roomInfo && (
        <Grid>
          <Grid display="flex" justifyContent="space-between">
            <Grid>신고</Grid>
            <Grid>삭제</Grid>
          </Grid>
          <Grid textAlign="center">
            <CountDownTimer restTime={roomInfo.restTime} />
          </Grid>
          <Grid display="flex" justifyContent="space-around">
            <Grid>{roomInfo.topicA}</Grid>
            <Grid>vs</Grid>
            <Grid>{roomInfo.topicB}</Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default RoomInfo;

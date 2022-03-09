import React from "react";
import Grid from "../../elements/Grid";
import ChatHeader from "./ChatHeader";

import GaugeTimer from "./GaugeTimer";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/modules/chat";
import { history } from "../../redux/configStore";

const RoomInfo = ({ roomInfo }) => {
  const dispatch = useDispatch();
  const [time, setTime] = React.useState(roomInfo.restTime);
  console.log("남은시간:",time);
  // 시간 카운트 때 chatBox 와 chatInput의 렌더링을 막기위해 분리
  const tick = () => {
    if (time > 0) setTime(time - 1);
  };

  React.useEffect(() => {
    if (time <= 0) {
      dispatch(actionCreators.deleteRoom(roomInfo.roomId));
      history.replace("/");
      return;
    }
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  return (
    <Grid flexShrink="0">
      <GaugeTimer restTime={time} time={roomInfo.time} />
      <ChatHeader {...roomInfo} restTime={time} />
    </Grid>
  );
};

export default RoomInfo;

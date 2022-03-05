import React from "react";
import Grid from "../../elements/Grid";
import ChatHeader from "./ChatHeader";

import GaugeTimer from "./GaugeTimer";

const RoomInfo = ({ roomInfo }) => {
  const [time, setTime] = React.useState(roomInfo.restTime);

  // 시간 카운트 때 chatBox 와 chatInput의 렌더링을 막기위해 분리
  const tick = () => {
    if (time > 0) setTime(time - 1);
  };

  React.useEffect(() => {
    if (time <= 0) {
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

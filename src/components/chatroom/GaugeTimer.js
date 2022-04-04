import { useState, useEffect } from "react";
import styled from "styled-components";
import { useInterval } from "../../modules/useInterval";

const GaugeTimer = (props) => {
  const start = new Date(props.createdAt.replaceAll("-", "/")); // 해당 채팅방 종료 시간
  const end = new Date(props.endAt.replaceAll("-", "/")); // 해당 채팅방 종료 시간
  const now = new Date(); // 현재 시간

  const [time, setTime] = useState((end - now) / 1000 + 1);

  useInterval(() => setTime((end - now) / 1000), time);
  //setInterval 커스텀 훅

  useEffect(() => {
    if (time <= 0) props.setTimeState(true);
  }, [time]);

  // 게이지 퍼센트
  const per =
    time > 60 ? (time / ((end - start) / 1000)) * 100 : (time / 60) * 100;

  return (
    <GaugeOuter {...props} style={{ ...props }}>
      <GaugeInner {...props} width={per} restTime={time < 60 ? true : false} />
    </GaugeOuter>
  );
};

GaugeTimer.defaultProps = {
  setTimeState: () => {},
};

const GaugeOuter = styled.div`
  ${(props) =>
    props.page === "main" ? "position:absolute; left:0; bottom:0;" : ""}
  min-height: 4px;
  width: 100%;
  background-color: #c4c4c4;

  overflow: hidden;
`;

const GaugeInner = styled.div.attrs((props) => ({
  style: {
    transform: `scaleX(${props.width / 100})`,
  },
}))`
  min-height: 4px;
  height: 100%;

  transform-origin: left;
  transition: 0.2s;

  background-color: ${(props) =>
    props.restTime ? "#FF5454" : props.theme.color.orange};
`;

export default GaugeTimer;

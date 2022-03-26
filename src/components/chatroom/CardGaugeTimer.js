import React from "react";
import styled from "styled-components";

const GaugeTimer = (props) => {
  const end = new Date(props.createdAt.replaceAll("-", "/")); // 해당 채팅방 종료 시간
  const now = new Date(); // 현재 시간

  // 긴방인지 짧은방인지 판단 후 종료시간에 더함
  //if (props.time) end.setMinutes(end.getMinutes() + 20);
  if (props.time) end.setMinutes(end.getMinutes() + 20);
  else end.setHours(end.getHours() + 1);

  // 종료 시간에서 현재 시간을 빼서 남은 시간 구함
  const restTime = Math.floor((end - now) / 1000);

  // 리렌더링을 위한 state
  const [time, setTime] = React.useState(0);

  // 1초마다 실행
  const tick = () => {
    if (restTime > 0) setTime(time + 1);
  };

  React.useEffect(() => {
    if (restTime <= 0) {
      props.setTimeState(true);
      return;
    }
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  // 게이지 퍼센트
  let per = (restTime / (props.time ? 1200 : 3600)) * 100;

  if (restTime < 60) {
    per = (restTime / 60) * 100;
  }
  if (per < 0) per = 0;

  return (
    <GaugeOuter {...props} style={{ ...props }}>
      <GaugeInner
        {...props}
        width={per}
        restTime={restTime < 60 ? true : false}
      />
    </GaugeOuter>
  );
};

const GaugeOuter = styled.div`
  ${(props) =>
    props.page === "main" ? "position:absolute; left:0; bottom:0;" : ""}
  height: 4px;
  width: 100%;
  background-color: #c4c4c4;
`;

const GaugeInner = styled.div.attrs((props) => ({
  style: {
    transform: `scaleX(${props.width / 100})`,
  },
}))`
  height: 100%;

  transform-origin: left;
  // transform 생성 기준 위치
  background-color: ${(props) =>
    props.restTime ? "#FF5454" : props.theme.color.orange};
`;

export default GaugeTimer;

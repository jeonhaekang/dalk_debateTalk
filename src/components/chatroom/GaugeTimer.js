import React from "react";
import styled from "styled-components";
import { actionCreators as chatAction } from "../../redux/modules/chat";
import { useDispatch } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { history } from "../../redux/configStore";

const GaugeTimer = (props) => {
  const dispatch = useDispatch();

  const end = new Date(props.createdAt.replaceAll("-", "/")); // 해당 채팅방 종료 시간
  const now = new Date(); // 현재 시간

  // 긴방인지 짧은방인지 판단 후 종료시간에 더함
  //if (props.time) end.setMinutes(end.getMinutes() + 20);
  if (props.time) end.setSeconds(end.getSeconds() + 30);
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
      dispatch(chatAction.deleteRoom(props.roomId));
      return;
    }
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  // 게이지 퍼센트
  const per = (restTime / (props.time ? 30 : 3600)) * 100;
  //const per = (restTime / (props.time ? 1200 : 3600)) * 100;

  return (
    <GaugeOuter {...props} style={{ ...props }}>
      <GaugeInner {...props} width={per} color={restTime < 60 && true} />
    </GaugeOuter>
  );
};

const GaugeOuter = styled.div`
  ${(props) =>
    props.page === "main" ? "position:absolute; left:0; bottom:0;" : ""}
  height: 4px;
  width: 100%;
  background-color: #c4c4c4;

  overflow: hidden;
`;

const GaugeInner = styled.div.attrs((props) => ({
  style: {
    width: `${props.width}%`,
  },
}))`
  height: 100%;

  transition: 0.3s;
  background-color: ${(props) =>
    props.color ? "#FF5454" : props.theme.color.orange};
`;

export default GaugeTimer;

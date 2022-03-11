import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

const CountDownTimer = (props) => {
  const end = new Date(props.createdAt); // 해당 채팅방 종료 시간
  const now = new Date(); // 현재 시간

  // 긴방인지 짧은방인지 판단 후 종료시간에 더함
  //if (props.time) end.setMinutes(end.getMinutes() + 20);
  if (props.time) end.setSeconds(end.getSeconds() + 30);
  else end.setHours(end.getHours() + 1);

  // 종료 시간에서 현재 시간을 빼서 남은 시간 구함
  const restTime = Math.floor((end - now) / 1000);

  // 리렌더링을 위한 state
  const [time, setTime] = useState(0);

  // 1초마다 실행
  const tick = () => {
    if (restTime > 0) setTime(time + 1);
  };

  useEffect(() => {
    if (restTime <= 0) {
      // dispatch(actionCreators.deleteRoom(props.roomId));
      return;
    }
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  // 분이랑 초로 변경
  const minutes = Math.floor(restTime / 60);
  const seconds = restTime % 60;

  return (
    <Timer>
      <Minutes>{minutes.toString().padStart(2, "0")}</Minutes> :
      <Seconds>{seconds.toString().padStart(2, "0")}</Seconds>
    </Timer>
  );
};

const Timer = styled.div`
  font-size: 36px;
  width: 110px;

  display: flex;
  justify-content: center;
`;

const Minutes = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
`;

const Seconds = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-start;
`;

export default CountDownTimer;

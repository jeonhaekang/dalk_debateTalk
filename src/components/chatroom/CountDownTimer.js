import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import { history } from "../../redux/configStore";
import { actionCreators as alertAction } from "../../redux/modules/alert";

const CountDownTimer = (props) => {
  const dispatch = useDispatch();
  const end = new Date(props.createdAt.replaceAll("-", "/")); // 해당 채팅방 종료 시간
  const now = new Date(); // 현재 시간

  // 긴방인지 짧은방인지 판단 후 종료시간에 더함
  //if (props.time) end.setMinutes(end.getMinutes() + 20);
  if (props.time) end.setSeconds(end.getSeconds() + 70);
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
      dispatch(
        alertAction.open({
          message: "토론이 종료되었습니다.",
          history: () => history.push("/"),
        })
      );
      return;
    }
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  // 분이랑 초로 변경
  const minutes = Math.floor(restTime / 60);
  const seconds = restTime % 60;

  return (
    <Timer restTime={restTime < 60 && true}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M15 1H9V3H15V1Z"
          fill={restTime < 60 ? "#FF5454" : "#333333"}
        />
        <path
          d="M19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM13 14H11V8H13V14Z"
          fill={restTime < 60 ? "#FF5454" : "#333333"}
        />
      </svg>
      <FlexGrid gap="0" marginBottom="5px">
        <Minutes>{minutes.toString().padStart(2, "0")}</Minutes> :
        <Seconds>{seconds.toString().padStart(2, "0")}</Seconds>
      </FlexGrid>
    </Timer>
  );
};

const Timer = styled.div`
  height: 60px;
  font-size: ${(props) => props.theme.fontSizes.headline1};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    color: ${(props) => props.color && "#FF5454"};
  }
`;

const Minutes = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
`;

const Seconds = styled.label`
  width: 40px;
  display: flex;
  justify-content: flex-start;
`;

export default CountDownTimer;

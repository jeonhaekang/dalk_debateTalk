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
  if (props.time) end.setMinutes(end.getMinutes() + 20);
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

  & div {
    color: ${(props) => props.restTime && "#FF5454"};
  }
`;

const Minutes = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
`;

const Seconds = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-start;
`;

export default CountDownTimer;

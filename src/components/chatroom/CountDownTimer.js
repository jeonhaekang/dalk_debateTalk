import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import { history } from "../../redux/configStore";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { useInterval } from "../../modules/useInterval";

const CountDownTimer = (props) => {
  const dispatch = useDispatch();

  const end = new Date(props.endAt.replaceAll("-", "/")); // 해당 채팅방 종료 시간
  const now = new Date(); // 현재 시간

  const [time, setTime] = useState((end - now) / 1000 + 1); // 남은 시간

  useInterval(() => setTime((end - now) / 1000), time); // 남은 시간 갱신

  //채팅방이 종료되면 퇴장 ------------------------------------------------------------------
  useEffect(() => {
    if (time <= 0) {
      history.replace("/");
      dispatch(
        alertAction.open({
          message: "토론이 종료되었습니다.",
        })
      );
      return;
    }
  }, [time]);

  const minutes = Math.floor(time / 60); // 분
  const seconds = Math.floor(time % 60); // 초

  return (
    <Timer restTime={time < 60 && true}>
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

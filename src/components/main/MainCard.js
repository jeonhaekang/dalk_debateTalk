import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import { history } from "../../redux/configStore";
import Blind from "../shared/Blind";
import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import GaugeTimer from "../chatroom/GaugeTimer";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/modules/chat";
import Center from "../../elements/Center";

const MainCard = (props) => {
  const dispatch = useDispatch();
  const [time, setTime] = React.useState(props.restTime);

  // 시간이 종료되면 채팅방 삭제
  const tick = () => {
    if (time > 0) setTime(time - 1);
  };

  React.useEffect(() => {
    if (time <= 0) {
      dispatch(actionCreators.deleteRoom(props.roomId));
      return;
    }
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  return (
    <FlexGrid
      is_column
      padding="15px 15px"
      borderRadius="10px"
      backgroundColor="#eee"
      gap="30px"
      _onClick={() => history.push("/chatroom/" + props.roomId)}
    >
      {/* {warnCnt >= 10 && <Blind>블라인드 처리된 채팅방</Blind>} */}
      <FlexGrid is_flex between>
        <FlexGrid is_flex>
          {props.category.map((el, i) => {
            return <Chip key={i}>{el}</Chip>;
          })}
        </FlexGrid>
        <Grid>{props.userInfo.nickname}</Grid>
      </FlexGrid>
      <FlexGrid is_flex alignItems="flex-start" between>
        <FlexGrid is_column center width="45%">
          {props.page && <Img />}
          <Topic>{props.topicA}</Topic>
        </FlexGrid>
        <Center>VS</Center>
        <FlexGrid is_column center width="45%">
          {props.page && <Img />}
          <Topic>{props.topicB}</Topic>
        </FlexGrid>
      </FlexGrid>
      <GaugeTimer restTime={time} time={props.time} page />
    </FlexGrid>
  );
};

MainCard.defaultProps = {};

const Topic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const Img = styled.div`
  --size: 58px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #c4c4c4;
`;

export default MainCard;

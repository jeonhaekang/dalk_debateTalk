import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Center from "../../elements/Center";
import FlexGrid from "../../elements/FlexGrid";
import Grid from "../../elements/Grid";
import apis from "../../shared/apis";
import CountDownTimer from "./CountDownTimer";

const ChatHeader = ({ topicA, topicB, restTime }, props) => {
  const [state, setState] = React.useState(false);
  const room = useSelector((props) => props.chat.currentRoom);

  const vote = (topic) => {
    const data = {
      topic: topic,
      point: 50,
    };
    console.log(room.roomId, data);
    apis
      .vote(room.roomId, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <InfoWrap state={state}>
      {!state ? (
        <FlexGrid>
          <DefaultTopic>{topicA}</DefaultTopic>
          <Center>VS</Center>
          <DefaultTopic>{topicB}</DefaultTopic>
        </FlexGrid>
      ) : (
        <FlexGrid is_column center>
          <CountDownTimer restTime={restTime} />
          <FlexGrid>
            <Topic onClick={() => vote(true)}>{topicA}</Topic>
            <Center>VS</Center>
            <Topic onClick={() => vote(false)}>{topicB}</Topic>
          </FlexGrid>
        </FlexGrid>
      )}

      <Grid position="absolute" right="5px" bottom="5px">
        <button onClick={() => setState(!state)}>
          {state ? "닫기" : "열기"}
        </button>
      </Grid>
    </InfoWrap>
  );
};

const InfoWrap = styled.div`
  background-color: #eee;
  height: ${(props) => (props.state ? 200 : 66)}px;
  transition: 0.3s;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.state ? "flex-start" : "center")};
  align-items: center;

  position: relative;
  padding: 0 16px;
`;
const DefaultTopic = styled.div`
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const Topic = styled(DefaultTopic)`
  background-color: #e0e0e0;
  border-radius: 15px;
  height: 120px;
  width: 100%;
  word-break: break-all;
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ChatHeader;

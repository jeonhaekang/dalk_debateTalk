import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import CountDownTimer from "./CountDownTimer";

const ChatHeader = ({ topicA, topicB, restTime }) => {
  const [state, setState] = React.useState(false);

  return (
    <InfoWrap state={state} width="100%">
      {!state ? (
        <Content style={{ fontSize: "24px" }}>
          {topicA} vs {topicB}
        </Content>
      ) : (
        <Content>
          <CountDownTimer restTime={restTime} />
          <Grid display="flex" gap="12px" width="100%" position="relative">
            <Topic>{topicA}</Topic>
            <Topic>{topicB}</Topic>
            <Vs>vs</Vs>
          </Grid>
        </Content>
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

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.state ? "flex-start" : "center")};
  align-items: center;

  position: relative;
  padding: 0 16px;

  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Vs = styled.div`
  font-size: 30px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Topic = styled.div`
  width: 100%;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 15px;
  height: 118px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ChatHeader;

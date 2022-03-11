import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Center from "../../elements/Center";
import FlexGrid from "../../elements/FlexGrid";
import Grid from "../../elements/Grid";
import CountDownTimer from "./CountDownTimer";
import Modal from "../shared/Modal";
import Vote from "./Vote";
import GaugeTimer from "./GaugeTimer";

const ChatHeader = (props) => {
  const [state, setState] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);
  const [data, setData] = React.useState();

  const roomInfo = useSelector((state) => state.chat.currentRoom);
  console.log(roomInfo);

  const vote = (topic) => {
    alert()
    // setData({ topic: topic });
    // setModalState(true);
  };
  
  return (
    <>
      {roomInfo && <GaugeTimer {...roomInfo} />}
      {roomInfo && (
        <InfoWrap state={state}>
          {!state ? (
            <FlexGrid>
              <DefaultTopic>{roomInfo.topicA}</DefaultTopic>
              <Center>VS</Center>
              <DefaultTopic>{roomInfo.topicB}</DefaultTopic>
            </FlexGrid>
          ) : (
            <FlexGrid is_column center>
              <CountDownTimer {...roomInfo} />
              <FlexGrid>
                <Topic onClick={() => vote(true)}>{roomInfo.topicA}</Topic>
                <Center>VS</Center>
                <Topic onClick={() => vote(false)}>{roomInfo.topicB}</Topic>
              </FlexGrid>
            </FlexGrid>
          )}

          <Grid position="absolute" right="5px" bottom="5px">
            <button onClick={() => setState(!state)}>
              {state ? "닫기" : "열기"}
            </button>
          </Grid>
        </InfoWrap>
      )}
      <Modal modalState={modalState} setModalState={setModalState}>
        <Vote {...data} setModalState={setModalState} />
      </Modal>
    </>
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

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Center from "../../elements/Center";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import CountDownTimer from "./CountDownTimer";
import Modal from "../shared/Modal";
import Vote from "./Vote";
import GaugeTimer from "./GaugeTimer";
import { useDispatch } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";

const ChatHeader = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);
  const [data, setData] = React.useState();

  const roomInfo = useSelector((state) => state.chat.currentRoom.roomInfo);
  const { roomId, topicA, topicB } = roomInfo;

  const vote = (topic) => {
    if (roomInfo.userVote) {
      dispatch(alertAction.open({ message: "이미 투표에 참가하셨습니다." }));
      return;
    }
    setData({ topic: topic });
    setModalState(true);
  };

  return (
    <div>
      {roomInfo && (
        <>
          <GaugeTimer {...roomInfo} page="chatRoom" />
          <FlexGrid height="60px" padding="16px">
            <Center>
              <CountDownTimer {...roomInfo} />
            </Center>

            <FlexGrid justifyContent="flex-end">
              <Open state={state} onClick={() => setState(!state)}>
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path
                    d="M20.7375 10.7375L15 16.4625L9.2625 10.7375L7.5 12.5L15 20L22.5 12.5L20.7375 10.7375Z"
                    fill="#C5C5C5"
                  />
                </svg>
              </Open>
            </FlexGrid>
          </FlexGrid>

          <InfoWrap state={state}>
            <DefaultTopic
              onClick={() => vote(true)}
              state={state}
              userVote={roomInfo.userVote?.userPick === true}
            >
              <Topic>{topicA}</Topic>
              {state && roomInfo.userVote?.userPick === true && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="white"
                  lineHeight="20px"
                >
                  {roomInfo.userVote.userPoint}RP
                </Text>
              )}

              {state && !roomInfo.userVote && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="#C0C0C0"
                  lineHeight="20px"
                >
                  선택하기
                </Text>
              )}
            </DefaultTopic>
            <Text size="headline2" weight="black" color="orange">
              VS
            </Text>
            <DefaultTopic
              onClick={() => vote(false)}
              state={state}
              userVote={roomInfo.userVote?.userPick === false}
            >
              <Topic>{topicB}</Topic>
              {state && roomInfo.userVote?.userPick === false && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="white"
                  lineHeight="20px"
                >
                  {roomInfo.userVote.userPoint}RP
                </Text>
              )}
              {state && !roomInfo.userVote && (
                <Text
                  position="absolute"
                  top="110px"
                  fontSize="12px"
                  color="#C0C0C0"
                  lineHeight="20px"
                >
                  선택하기
                </Text>
              )}
            </DefaultTopic>
          </InfoWrap>
        </>
      )}
      {modalState && (
        <Modal modalState={modalState} setModalState={setModalState}>
          <Vote {...data} />
        </Modal>
      )}
    </div>
  );
};

const Open = styled.div`
  transform: ${(props) => props.state && "rotate(180deg)"};
  transition: 0.2s;
`;

const Topic = styled.div``;

const DefaultTopic = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 28px;

  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  border-radius: 10px;

  transition: 0.3s;
  //color: ${(props) => (props.state ? "orange" : "orange")};
  & * {
    color: ${(props) =>
      props.state
        ? props.userVote
          ? "white"
          : props.theme.color.black
        : props.userVote
        ? props.theme.color.orange
        : props.theme.color.black};
  }

  background-color: ${(props) =>
    props.state
      ? props.userVote
        ? props.theme.color.orange
        : "#FAFAFA"
      : "white"};

  box-shadow: ${(props) => props.state && "0px 2px 6px rgba(0, 0, 0, 0.15)"};

  ${Topic} {
    max-width: 140px;

    ${(props) =>
      !props.state &&
      "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"}
  }
`;

const InfoWrap = styled.div`
  background-color: #eee;
  height: ${(props) => (props.state ? 200 : 80)}px;
  transition: 0.2s;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 14px;

  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;

  background: #fefefe;

  padding: 16px 28px 24px 28px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
`;

export default ChatHeader;

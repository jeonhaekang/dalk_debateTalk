import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import CountDownTimer from "./CountDownTimer";
import Modal from "../shared/Modal";
import Vote from "./Vote";
import GaugeTimer from "./GaugeTimer";
import { useDispatch } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { ReactComponent as Unfold } from "../../image/chatRoom/unfold.svg";
import { ReactComponent as BackIcon } from "../../image/header/arrow_back.svg";
import { ReactComponent as MeatballIcon } from "../../image/header/meatball.svg";
import { ReactComponent as ReportIcon } from "../../image/header/report.svg";
import { ReactComponent as PersonIcon } from "../../image/header/person.svg";
import { actionCreators as chatAction } from "../../redux/modules/chat";
import { history } from "../../redux/configStore";

const ChatHeader = (props) => {
  const dispatch = useDispatch();
  const [foldState, setFoldState] = React.useState(false); // 펼침 여부
  const [voteModal, setVoteModal] = React.useState(false); // 투표 모달
  const [toggleModal, setToggleModal] = React.useState(false); // 신고하기 토글 모달
  const [data, setData] = React.useState();

  const roomInfo = useSelector((state) => state.chat.currentRoom.roomInfo);
  const userList = useSelector((state) => state.chat.currentRoom.users);
  console.log(roomInfo);

  const vote = (topic) => {
    if (roomInfo.userVote) {
      dispatch(alertAction.open({ message: "이미 투표에 참가하셨습니다." }));
      return;
    }
    setData({ topic: topic });
    setVoteModal(true);
  };

  const reportRoom = () => {
    dispatch(chatAction.reportRoomDB(roomInfo.roomId));
  };

  return (
    <>
      {roomInfo && (
        <>
          {/* 헤더 부분 */}
          <ChatHeaderContainer>
            {toggleModal && (
              <Modal
                modalState={toggleModal}
                setModalState={setToggleModal}
                type="hamburger"
              >
                <FlexGrid _onClick={reportRoom}>
                  <ReportIcon />
                  <Text marginBottom="3px" color="alert">
                    신고하기
                  </Text>
                </FlexGrid>
              </Modal>
            )}
            <BackIcon onClick={() => history.goBack()} />
            <FlexGrid center gap="0">
              <CountDownTimer {...roomInfo} />
              <PersonIcon />
              {userList.length}
            </FlexGrid>
            <MeatballIcon onClick={() => setToggleModal(true)} />
          </ChatHeaderContainer>

          {/* 타이머 게이지 */}
          <GaugeTimer {...roomInfo} page="chatRoom" />

          {/* 주제 부분 */}
          <TopicContainer foldstate={foldState}>
            <Open
              foldstate={foldState ? 1 : 0}
              onClick={() => setFoldState(!foldState)}
            />
            <TopicBox
              _onClick={() => vote(true)}
              userVote={roomInfo.userVote?.userPick === true ? true : false}
              foldstate={foldState}
            >
              {/* 펼침 여부와 배팅 여부에 따른 안내문구 */}
              {roomInfo.topicA}
              {foldState && !roomInfo.userVote && (
                <div className="voteInfo">선택하기</div>
              )}
              {foldState && roomInfo.userVote.userPick === true && (
                <div className="voteInfo">{roomInfo.userVote.userPoint}</div>
              )}
            </TopicBox>

            <Text size="headline2" weight="black" color="orange">
              VS
            </Text>

            <TopicBox
              _onClick={() => vote(false)}
              userVote={roomInfo.userVote?.userPick === false ? true : false}
              foldstate={foldState}
            >
              {/* 펼침 여부와 배팅 여부에 따른 안내문구 */}
              {roomInfo.topicB}
              {foldState && !roomInfo.userVote && (
                <div className="voteInfo">선택하기</div>
              )}
              {foldState && roomInfo.userVote.userPick === false && (
                <div className="voteInfo">{roomInfo.userVote.userPoint} RP</div>
              )}
            </TopicBox>
          </TopicContainer>
        </>
      )}

      {/* 투표 모달 */}
      {voteModal && (
        <Modal modalState={voteModal} setModalState={setVoteModal}>
          <Vote {...data} setModalState={setVoteModal} />
        </Modal>
      )}
    </>
  );
};

const ChatHeaderContainer = styled(FlexGrid).attrs(() => ({
  between: true,
}))`
  height: 70px;
  padding: 16px;
`;

const Open = styled(Unfold)`
  /* 펼침 여부에 따른 화살표 방향 조정 */
  transform: ${(props) =>
    props.foldstate ? "rotate(180deg)" : "rotate(0deg)"};

  transition: 0.2s;
  position: absolute;
  top: 0;
  right: 0;
`;

const TopicBox = styled(FlexGrid).attrs(() => ({
  center: true,
}))`
  /* 펼침 여부에 따른 배경색 및 쉐도우 변환*/
  ${(props) =>
    props.foldstate &&
    `backgroundColor:#FAFAFA; 
     box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.2);
     `}

  /* 투표 여부에 따른 색 변환 */
  ${(props) => props.userVote && `color:${props.theme.color.orange};`}

  /* 투표 여부와 펼침 여부에 따른 색 변환 */
  ${(props) =>
    props.userVote &&
    props.foldstate &&
    `background-color:${props.theme.color.orange};
     color:white;`}

  border-radius: 10px;
  max-width: 156px;
  height: 100%;

  display: -webkit-box;
  position: relative;

  overflow: hidden;
  text-align: center;

  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 28px;

  transition: 0.2s;

  .voteInfo {
    position: absolute;
    bottom: 5px;
    font-size: 12px;
    font-weight: 400;
    width: 100%;

    color: ${(props) => (props.userVote ? "white" : "#c0c0c0")};
  }
`;

const TopicContainer = styled(FlexGrid).attrs(() => ({
  center: true,
  between: true,
}))`
  height: ${(props) => (props.foldstate ? 200 : 80)}px;
  padding: ${(props) => (props.foldstate ? "24px 28px" : "12px 28px")};
  transition: 0.2s;
  gap: 14px;

  border-bottom: 1px solid #c4c4c4;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);

  position: relative;
`;

export default ChatHeader;

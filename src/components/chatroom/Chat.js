import React from "react";
import styled from "styled-components";
import { FcSpeaker } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Badge from "../../elements/Badge";
import FlexGrid from "../../elements/FlexGrid";
import { rank, discriminant } from "../../data/rank";
import { actionCreators as userAction } from "../../redux/modules/user";
import { actionCreators as alertAction } from "../../redux/modules/alert";

const Chat = (props) => {
  const dispatch = useDispatch();
  const { userInfo, message, bigFont, type, createdAt } = props;

  const [togleState, setTogleState] = React.useState(false);

  const time = moment(createdAt).format("HH:mm");

  const user = useSelector((state) => state.user.user);
  const myName = useSelector((state) => state.item.itemList.myName);

  const togleShow = () => {
    if (userInfo.id !== user.id) setTogleState(!togleState);
  };

  const reportUser = (e) => {
    console.log("report");

    if (userInfo.id === user.id) {
      return;
    }
    dispatch(
      alertAction.open({
        type: "confirm",
        message: "정말로 신고하시겠습니까?",
        action: () => {
          dispatch(userAction.reportUserDB(userInfo.id, message));
        },
      })
    );
    // dispatch(userAction.reportUserDB(userInfo.id, message));
  };

  if (type !== "TALK") {
    return (
      <Alert>
        <FcSpeaker />
        {message}
      </Alert>
    );
  }

  const userRank = rank[discriminant(userInfo.ex)];

  return (
    <>
      <ChatBox bigFont={bigFont} user={userInfo.id === user.id ? true : false}>
        <FlexGrid gap="3px" width="auto" center _onClick={togleShow}>
          <Badge src={userRank.img}></Badge>
          {myName ? myName : userInfo.nickname}
        </FlexGrid>
        <div className="messageBox">
          <div className="message">{message}</div>
          <div>{time}</div>
        </div>
        {togleState && <Report onClick={reportUser}>신고</Report>}
      </ChatBox>
    </>
  );
};

const Report = styled.div`
  background-color: pink;
  width: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  position: absolute;
  top: 20px;
`;

const Alert = styled.div`
  align-self: center;
  background-color: #9dcce0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 10px;
  border-radius: 10px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.user ? "flex-end" : "flex-start")};
  gap: 5px;

  position: relative;

  .messageBox {
    display: flex;
    align-items: flex-end;
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    gap: 5px;
  }

  .message {
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => (props.user ? "#E0E0E0" : "#EAEAEA")};
    ${(props) => props.bigFont && "font-size:26px;"}
    word-break: break-all;
    // 영문 한글 상관없이 전부 줄바꿈
  }
`;

export default React.memo(Chat);

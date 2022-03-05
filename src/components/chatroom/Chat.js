import React from "react";
import styled from "styled-components";
import { FcSpeaker } from "react-icons/fc";
import { useSelector } from "react-redux";
import moment from "moment";

const Chat = (props) => {
  const { userInfo, message, bigFont, type, createdAt } = props;

  const time = moment(createdAt).format("HH:mm");

  const user = useSelector((state) => state.user.user);
  const myName = useSelector((state) => state.item.myName);
  if (type !== "TALK") {
    return (
      <Alert>
        <FcSpeaker />
        {message}
      </Alert>
    );
  }

  return (
    <>
      <ChatBox bigFont={bigFont} user={userInfo.id === user.id ? true : false}>
        <div className="nickname">{myName ? myName : userInfo.nickname}</div>
        <div className="messageBox">
          <div className="message">{message}</div>
          <div>{time}</div>
        </div>
      </ChatBox>
    </>
  );
};

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
    word-break: break-all;
    // 영문 한글 상관없이 전부 줄바꿈
  }
`;

const NickName = styled.div``;

const Message = styled.div`
  background-color: gray;
`;

export default React.memo(Chat);

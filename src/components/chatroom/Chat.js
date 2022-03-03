import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import { useSelector } from "react-redux";

const Chat = (props) => {
  const { userInfo, message, bigFont } = props;
  console.log("bigFont : ", bigFont);

  const user = useSelector((state) => state.user.user);
  return (
    <ChatBox bigFont={bigFont} user={userInfo.id === user.id ? true : false}>
      <Grid>{userInfo.nickname}</Grid>
      <div className="message">{message}</div>
    </ChatBox>
  );
};

const ChatBox = styled.div`
  ${(props) =>
    props.user
      ? "align-self: flex-end; text-align: right;"
      : "align-self: flex-start; text-align: left;"}
  background-color: ${(props) => (props.user ? "orange" : "gray")};

  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;

  font-size: ${(props) => (props.bigFont ? "30px" : "14px")};
`;

export default React.memo(Chat);

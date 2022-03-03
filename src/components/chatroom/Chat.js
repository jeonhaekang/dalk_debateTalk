import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import { useSelector } from "react-redux";

const Chat = (props) => {
  const { userInfo, message } = props;

  const user = useSelector((state) => state.user.user);
  return (
    <ChatBox user={userInfo.id === user.id ? true : false}>
      <Grid>{userInfo.nickname}</Grid>
      <div className="message">{message}</div>
    </ChatBox>
  );
};

const ChatBox = styled.div`
  ${(props) => (props.user ? "align-self: flex-end; text-align: right;" : "")}
  background-color: ${(props) => (props.user ? "orange" : "gray")};

  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
`;

export default React.memo(Chat);

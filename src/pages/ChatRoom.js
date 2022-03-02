import React from "react";
import Header from "../shared/Header";
import Input from "../elements/Input";
import Grid from "../elements/Grid";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { getCookie } from "../shared/Cookie";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ChatRoom = (props) => {
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = React.useState();
  const [messageLog, setMessageLog] = React.useState([]);

  const roomId = props.match.params.chatRoomId;

  const token = getCookie("authorization");

  const sock = SockJS("http://13.124.244.126:8080/ws-stomp");
  let ws = Stomp.over(sock);
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다
  // over를 사용하여 webSocket의 유형을 sockjs로 변경해준다.
  const headers = {
    Authorization: token,
  };

  const subCallback = (log) => {
    const newMassage = JSON.parse(log.body);
    console.log(newMassage);
    setMessageLog((log) => [...log, newMassage]);
  };

  const connectCallback = () => {
    console.log("접속 성공");

    ws.subscribe(`/sub/api/chat/rooms/${roomId}`, subCallback, headers);
  };
  // client("url", callback, headers)

  const errorCallback = () => {
    console.log("접속 실패");
  };

  const sendMessage = () => {
    const data = {
      type: "TALK",
      roomId: roomId,
      message: message,
    };
    ws.send("/pub/chat/message", headers, JSON.stringify(data));
    // send(url(destination), headers, body)
  };

  React.useEffect(() => {
    ws.connect(headers, connectCallback, errorCallback);
    // connect(headers, connectCallback, errorCallback); : 헤더를 전달해야 하는 경우의 형식

    return () => ws.disconnect();
  }, []);
  return (
    <>
      <Header page="토론방" />
      <Grid
        display="flex"
        flexDirection="column"
        gap="20px"
        height="calc(100% - 50px)"
        border="1px solid orange"
      >
        <Grid display="flex" justifyContent="space-between">
          <Grid>신고</Grid>
          <Grid>삭제</Grid>
        </Grid>
        <Grid textAlign="center">08:00:00</Grid>
        <Grid display="flex" justifyContent="space-around">
          <Grid>짜장면</Grid>
          <Grid>vs</Grid>
          <Grid>짬뽕</Grid>
        </Grid>
        <ShowChat>
          {messageLog.map((el, key) => {
            console.log(el.userId, user.id);
            return (
              <Chat key={key} user={el.userId === user.id ? true : false}>
                {el.message}
              </Chat>
            );
          })}
        </ShowChat>
      </Grid>
      <Grid
        position="absolute"
        bottom="0"
        border="1px solid black"
        width="100%"
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Input
          padding="10px"
          height="40px"
          width="90%"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => sendMessage()}>송신</button>
      </Grid>
    </>
  );
};

ChatRoom.defaultProps = {};

const Chat = styled.div`
  width: 80%;
  padding: 5px;
  background-color: ${(props) => (props.user ? "orange" : "gray")};
  border-radius: 5px;
  color: white;
  font-weight: bold;

  ${(props) => (props.user ? "align-self: flex-end; text-align: right;" : "")}
`;

const ShowChat = styled.div`
  border: 1px solid red;
  height: 100%;
  margin-bottom: 60px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 10px;
`;

export default ChatRoom;

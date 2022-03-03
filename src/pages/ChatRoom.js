import React from "react";
import Header from "../shared/Header";
import Grid from "../elements/Grid";
import CountDownTimer from "../components/ChatRoom/CountDownTimer";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { getCookie } from "../shared/Cookie";
import ChatBox from "../components/chatroom/ChatBox";
import ChatInput from "../components/chatroom/ChatInput";
import RoomInfo from "../components/chatroom/RoomInfo";

const ChatRoom = (props) => {
  const sock = SockJS("http://13.124.244.126:8080/ws-stomp");
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다

  const data = {
    client: Stomp.over(sock),
    // over를 사용하여 webSocket의 유형을 sockjs로 변경해준다.
    roomId: props.match.params.chatRoomId, // 입장 채팅방
    headers: {
      Authorization: getCookie("authorization"),
    },
  };

  const hoursMinSecs = {hours:1, minutes: 40, seconds: 0}

  return (
    <>
      <Header page="토론방" />
      <Grid
        display="flex"
        flexDirection="column"
        gap="20px"
        height="calc(100% - 50px)"
        border="1px solid blue"
      >
        <RoomInfo />
        <ChatBox {...data} />
        <ChatInput {...data} />
      </Grid>
    </>
  );
};

ChatRoom.defaultProps = {};

export default ChatRoom;

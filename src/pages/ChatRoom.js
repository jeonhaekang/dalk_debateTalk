import React, { useEffect } from "react";
import Header from "../shared/Header";
import Input from "../elements/Input";
import Grid from "../elements/Grid";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import * as StompJS from "@stomp/stompjs";
import { getCookie } from "../shared/Cookie";

const ChatRoom = (props) => {
  const token = getCookie("authorization");
  let sockJS = SockJS("http://13.124.244.126:8080/chatting");
  let client = Stomp.over(sockJS);
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다
  // over를 사용하여 webSocket의 유형을 sockjs로 변경해준다.
  const roomId = 1;
  const headers = {
    token: token,
  };

  const connectCallback = () => {
    console.log("접속 성공");
    // client.subscribe(
    //   `/sub/api/chat/rooms/${roomId}`,
    //   (data) => {
    //     console.log(data);
    //   },
    //   headers
    // );
  };
  // client("url", callback, headers)

  const errorCallback = () => {
    console.log("접속 실패");

    client.debug = function (str) {
      console.log(str);
    };
  };

  const sendMessage = () => {
    const data = {
      //type: "TALK",
      roomId: roomId,
      sender: "닉네임",
      message: "테스트",
    };
    client.send("pub/api/chat/message", headers, JSON.stringify(data));
    // send(url(destination), headers, body)
  };

  React.useEffect(() => {
    client.connect(headers, connectCallback, errorCallback);
    // connect(headers, connectCallback, errorCallback); : 헤더를 전달해야 하는 경우의 형식

    return () => client.disconnect();
  });

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
        <Grid border="1px solid red" height="100%" marginBottom="60px">
          채팅방
        </Grid>
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
        <Input padding="10px" height="40px" width="90%" />
        <button onClick={() => sendMessage()}>송신</button>
      </Grid>
    </>
  );
};

ChatRoom.defaultProps = {};

export default ChatRoom;

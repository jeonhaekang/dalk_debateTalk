import React, { useEffect } from "react";
import Header from "../shared/Header";
import Input from "../elements/Input";
import Grid from "../elements/Grid";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import * as StompJS from "@stomp/stompjs";
import { getCookie } from "../shared/Cookie";

const ChatRoom = (props) => {
  // const webSocketUrl = `ws://13.124.244.126/ws/chat`;
  // const [socketConnected, setSocketConnected] = React.useState(false);
  // let ws = React.useRef(null);

  // React.useEffect(() => {
  //   if (!ws.current) {
  //     ws.current = new WebSocket(webSocketUrl);
  //     ws.current.onopen = () => {
  //       console.log("connected to " + webSocketUrl);
  //       setSocketConnected(true);
  //     };
  //     ws.current.onclose = (error) => {
  //       console.log("disconnect from " + webSocketUrl);
  //       console.log(error);
  //     };
  //     ws.current.onerror = (error) => {
  //       console.log("connection error " + webSocketUrl);
  //       console.log(error);
  //     };
  //   }
  // });
  //----------------------------------------
  const token = getCookie("access-token");
  let sockJS = SockJS("http://13.124.244.126:8080/chatting");
  let ws = Stomp.over(sockJS);

  function wsConnectSubscribe() {
    try {
      ws.connect({ token: token }, () => {});
    } catch (err) {
      console.log(err);
    }
  }

  function wsDisConnectUnsubscribe() {
    try {
      ws.disconnect(() => {
        ws.unsubscribe("sub-0");
      });
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    wsConnectSubscribe();

    return () => wsDisConnectUnsubscribe();
  });
  //----------------------------------------
  // const client = new StompJS.Client({
  //   brokerURL: "ws://13.124.244.126/ws-stomp",
  //   debug: function (str) {
  //     console.log("연결실패", str);
  //   },
  //   reconnectDelay: 30000,
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000,
  // });

  // client.onConnect = function (frame) {
  //   console.log("성공적으로 연결");
  // };

  // client.onStompError = function (frame) {
  //   console.log("Broker reported error: " + frame.headers["message"]);
  //   console.log("Additional details: " + frame.body);
  // };

  // const checkMessage = (data) => {
  //   console.log(data);
  // };

  // React.useEffect(() => {
  //   client.activate();
  //   // const subscription = client.subscribe("/chat", (data) =>
  //   //   checkMessage(data)
  //   // );
  //   return () => {
  //     //subscription.unsubscribe();
  //     client.deactivate();
  //   };
  // });

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
      </Grid>
    </>
  );
};

ChatRoom.defaultProps = {};

export default ChatRoom;

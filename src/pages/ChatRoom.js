import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch } from "react-redux";

import { getCookie } from "../shared/Cookie";
import ChatBox from "../components/chatroom/ChatBox";
import ChatInput from "../components/chatroom/ChatInput";
import ChatHeader from "../components/chatroom/ChatHeader";
import { actionCreators as spinnerAction } from "../redux/modules/spinner";
import { actionCreators as chatAction } from "../redux/modules/chat";
import styled from "styled-components";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const sock = SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다

  const [client, setClient] = useState(null); // 웹소켓 클라이언트
  const roomId = props.match.params.chatRoomId;

  React.useEffect(() => {
    dispatch(spinnerAction.start());
    setClient({
      client: Stomp.over(sock),
      roomId: roomId,
      headers: {
        Authorization: getCookie("authorization"),
      },
    });

    return () => {
      dispatch(chatAction.currentRoomClear());
      // 방에서 나갈 때 정보 초기화
    };
  }, []);

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [messageLoaded, setMessageLoaded] = useState(false);

  useEffect(() => {
    infoLoaded && messageLoaded && dispatch(spinnerAction.end());
    console.log(infoLoaded, messageLoaded);
  }, [infoLoaded, messageLoaded]);

  return (
    <ChatRoomContainer footer>
      <ChatHeader roomId={roomId} setInfoLoaded={setInfoLoaded} />
      {client && (
        <>
          <ChatBox
            {...client}
            messageLoaded={messageLoaded}
            setMessageLoaded={setMessageLoaded}
          />
          <ChatInput {...client} />
        </>
      )}
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  height: calc(var(--vh) * 100);
  display: flex;
  flex-direction: column;
`;

export default ChatRoom;

import React, { useState } from "react";
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

  const [client, setClient] = useState(null);

  React.useEffect(() => {
    setClient({
      time: new Date().getTime(),
      client: Stomp.over(sock),
      roomId: props.match.params.chatRoomId,
      headers: {
        Authorization: getCookie("authorization"),
      },
    });
    dispatch(spinnerAction.start());
    dispatch(chatAction.getOneRoomDB(props.match.params.chatRoomId));
    // 방에 들어오면 데이터 업데이트

    dispatch(chatAction.loadUserListDB(props.match.params.chatRoomId));
    return () => {
      dispatch(chatAction.currentRoomClear());
      // 방에서 나갈 때 정보 초기화
    };
  }, []);

  const [roomInfoLoaded, setRoomInfoLoaded] = React.useState(false);
  const [messageLoaded, setMessageLoaded] = React.useState(false);

  console.log(client);

  React.useEffect(() => {
    if (roomInfoLoaded && messageLoaded) {
      dispatch(spinnerAction.end());
    }
  }, [roomInfoLoaded, messageLoaded]);

  return (
    <ChatRoomContainer footer>
      <ChatHeader is_loaded={setRoomInfoLoaded} />
      {client && (
        <>
          <ChatBox
            {...client}
            loaded={messageLoaded}
            is_loaded={setMessageLoaded}
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

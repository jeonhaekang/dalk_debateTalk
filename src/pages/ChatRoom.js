import React from "react";
import Header from "../shared/Header";
import Grid from "../elements/Grid";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";

import { getCookie } from "../shared/Cookie";
import ChatBox from "../components/chatroom/ChatBox";
import ChatInput from "../components/chatroom/ChatInput";
import RoomInfo from "../components/chatroom/RoomInfo";
import { actionCreators } from "../redux/modules/chat";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    console.log("실행");
    dispatch(actionCreators.getOneRoomDB(data.roomId));
    // 방에 들어오면 데이터 업데이트
    return () => {
      dispatch(actionCreators.setCurrentRoom(null));
      // 방에서 나갈 때 정보 초기화
    };
  }, []);

  const roomInfo = useSelector((state) => state.chat.currentRoom);

  return (
    <>
      {roomInfo && (
        <>
          <Header page="토론방" report />
          <Grid
            display="flex"
            flexDirection="column"
            height="calc(100% - 60px)"
          >
            <RoomInfo roomInfo={roomInfo} />
            <ChatBox {...data} />
            <ChatInput {...data} />
          </Grid>
        </>
      )}
    </>
  );
};

ChatRoom.defaultProps = {};

export default ChatRoom;

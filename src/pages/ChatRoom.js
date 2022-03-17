import React from "react";
import NewHeader from "../shared/NewHeader";
import Grid from "../elements/Grid";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";

import { getCookie } from "../shared/Cookie";
import ChatBox from "../components/chatroom/ChatBox";
import ChatInput from "../components/chatroom/ChatInput";
import ChatHeader from "../components/chatroom/ChatHeader";
import { actionCreators } from "../redux/modules/chat";
import FlexGrid from "../elements/FlexGrid";
import ContentContainer from "../elements/Container";
import { actionCreators as chatAction } from "../redux/modules/chat";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const sock = SockJS("http://3.34.199.42:8080/ws-stomp");
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다

  const data = {
    client: Stomp.over(sock),
    // over를 사용하여 webSocket의 유형을 sockjs로 변경해준다.
    roomId: props.match.params.chatRoomId, // 입장 채팅방
    headers: {
      Authorization: getCookie("authorization"),
    },
  };

  const roomInfo = useSelector((props) => props.chat.currentRoom.roomInfo);
  console.log(roomInfo);

  const userList = useSelector((state) => state.chat.currentRoom.users);
  console.log(userList.length);

  React.useEffect(() => {
    dispatch(actionCreators.getOneRoomDB(data.roomId));
    // 방에 들어오면 데이터 업데이트

    dispatch(chatAction.loadUserListDB(data.roomId));
    return () => {
      dispatch(actionCreators.setCurrentRoom(null));
      // 방에서 나갈 때 정보 초기화
    };
  }, []);

  return (
    <>
      <FlexGrid is_column height="100%" gap="0">
        <NewHeader page="토론방" users={userList.length} />
        {roomInfo && (
          <ContentContainer Xfooter display="flex" flexDirection="column">
            <ChatHeader {...roomInfo} />
            <ChatBox {...data} />
            <ChatInput {...data} />
          </ContentContainer>
        )}
      </FlexGrid>
    </>
  );
};

ChatRoom.defaultProps = {};

export default ChatRoom;

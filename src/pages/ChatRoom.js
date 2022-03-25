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
import Text from "../elements/Text";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const sock = SockJS("https://raddas.site/ws-stomp");
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

  const userList = useSelector((state) => state.chat.currentRoom.users);

  const reportRoom = () => {
    dispatch(chatAction.reportRoomDB(data.roomId));
  };

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
        <NewHeader page="토론방" users={userList.length} meatball>
          <FlexGrid _onClick={reportRoom}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <path
                d="M21.5 19.8621V12.9656C21.5 8.73109 19.45 5.18628 15.875 4.24835C15.875 4.24835 15.0375 4 14 4C12.9625 4 12.125 4.24824 12.125 4.24824C8.5375 5.18617 6.5 8.7173 6.5 12.9656V19.8621H4V24H24V19.8621H21.5ZM15.25 19.8621H12.75V17.1035H15.25V19.8621ZM15.25 14.3449H12.75V8.82764H15.25V14.3449Z"
                fill="#FF6969"
              />
            </svg>
            <Text marginBottom="3px" color="alert">
              신고하기
            </Text>
          </FlexGrid>
        </NewHeader>

        {roomInfo && (
          <ContentContainer
            Xfooter
            display="flex"
            flexDirection="column"
            height="100%"
          >
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

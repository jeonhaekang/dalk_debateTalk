import React from "react";
import Header from "../shared/Header";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";

import { getCookie } from "../shared/Cookie";
import ChatBox from "../components/chatroom/ChatBox";
import ChatInput from "../components/chatroom/ChatInput";
import ChatHeader from "../components/chatroom/ChatHeader";
import { actionCreators } from "../redux/modules/chat";
import FlexGrid from "../elements/FlexGrid";
import { actionCreators as chatAction } from "../redux/modules/chat";
import Text from "../elements/Text";
import Container from "../elements/Container";
import { ReactComponent as ReportIcon } from "../image/header/report.svg";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  // const sock = SockJS("http://ddanddan.shop/ws-stomp");
  const sock = SockJS("https://raddas.site/ws-stomp");
  // const sock = SockJS("https://dongseok.shop/ws-stomp");
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다

  const data = {
    client: Stomp.over(sock),
    // over를 사용하여 webSocket의 유형을 sockjs로 변경해준다.
    roomId: props.match.params.chatRoomId, // 입장 채팅방
    headers: {
      Authorization: getCookie("authorization"),
    },
  };

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
      <Header page="토론방" meatball>
        <FlexGrid _onClick={reportRoom}>
          <ReportIcon />
          <Text marginBottom="3px" color="alert">
            신고하기
          </Text>
        </FlexGrid>
      </Header>

      <Container>
        <ChatHeader />
        <ChatBox {...data} />
        <ChatInput {...data} />
      </Container>
    </>
  );
};

export default ChatRoom;

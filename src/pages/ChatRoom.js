import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch } from "react-redux";
import { getCookie } from "../shared/Cookie";
import ChatBox from "../components/chatroom/ChatBox";
import ChatInput from "../components/chatroom/ChatInput";
import ChatHeader from "../components/chatroom/ChatHeader";
import { actionCreators as spinnerAction } from "../redux/modules/spinner";
import { actionCreators as chatAction } from "../redux/modules/chat";
import { actionCreators as alertAction } from "../redux/modules/alert";
import styled from "styled-components";
import { connectSocket } from "../modules/chatSocket";
import { mobileCheck } from "../modules/mobileCheck";
import { history } from "../redux/configStore";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const [infoLoaded, setInfoLoaded] = useState(false); // 채팅방 정보 로딩 state
  const [messageLoaded, setMessageLoaded] = useState(false); // 이전 채팅내역 로딩 state

  const sock = SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다

  const client = Stomp.over(sock);
  client.debug = null;
  // 클라이언트를 state나 redux에 저장하지 않고 이렇게 선언해 사용하면 ChatRoom페이지가 렌더링 될 시, 새로운 client가 생성되는 것 같다
  // 하지만 우리 소켓 서버는 중앙 서버에 데이터를 전송하면 중앙 서버에서 각 채팅방에 메세지를 뿌려주는 형태이기에
  // 클라이언트가 바뀌더라도 useEffect에서 connect할 때와 disconnect할 때의 클라이언트가 동일하다면 send할 때 다른 클라이언트에 보내더라도 동일한 결과를 가져오는 것 같다

  const headers = { Authorization: getCookie("authorization") };
  const roomId = props.match.params.chatRoomId;

  //스피너 실행 및 종료시 리덕스 클리어----------------------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(spinnerAction.start()); // 스피너 시작

    return () => {
      dispatch(chatAction.currentRoomClear()); // 채팅방 정보 클리어
    };
  }, []);

  //채팅방 정보를 모두 불러오면 스피너 종료-------------------------------------------------------------------------------------------
  useEffect(() => {
    infoLoaded && messageLoaded && dispatch(spinnerAction.end()); // 스피너 종료
  }, [infoLoaded, messageLoaded]);

  //이전 메세지 로딩이 끝났는지 검사-------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!messageLoaded) return;

    connectSocket(roomId, headers, client);
    // 메세지 로딩이 끝나면 소켓 서버에 연결

    window.addEventListener("beforeunload", (e) => {
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
    }); // 브라우저를 새로고침 하거나 종료하면 disconnect신호 보냄

    window.addEventListener("visibilitychange", visibleHendler);
    // 모바일 환경에서 탭 전환이나 화면 전환시 disconnect신호를 보내지 못해 발생하는 오류 해결을 위해 사용

    return () => {
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
      window.removeEventListener("visibilitychange", visibleHendler);
    };
  }, [messageLoaded]);

  //화면 전환이 이루어지면 실행할 함수------------------------------------------------------------------------------------------------
  const visibleHendler = (e) => {
    const state = document.visibilityState === "hidden"; // 화면에 안보이면
    const mobile = mobileCheck(); // 모바일인지 체크

    // 모바일에서 화면전환이 이루어질 경우 실행
    if (state && mobile) {
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
      history.replace("/");
      dispatch(
        alertAction.open({
          type: "confirm",
          message: "채팅방에 다시 입장하시겠습니까?",
          action: () => history.push("/chatroom/" + roomId),
        })
      );
    }
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <ChatRoomContainer footer>
      <ChatHeader roomId={roomId} setInfoLoaded={setInfoLoaded} />
      <ChatBox roomId={roomId} setMessageLoaded={setMessageLoaded} />
      <ChatInput client={client} headers={headers} roomId={roomId} />
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  height: calc(var(--vh) * 100);
  display: flex;
  flex-direction: column;
`;

export default ChatRoom;

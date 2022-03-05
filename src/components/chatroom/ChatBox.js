import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { actionCreators } from "../../redux/modules/chat";
import Chat from "./Chat";

const ChatBox = ({ roomId, headers, client }) => {
  const dispatch = useDispatch();
  const scrollRef = React.useRef();
  const [messageLog, setMessageLog] = React.useState([]);

  const connectCallback = () => {
    // 연결 성공시 호출함수
    client.subscribe(`/sub/api/chat/rooms/${roomId}`, subCallback, headers);
  };
  // subscribe("url", callback, headers)

  const errorCallback = () => {
    // 연결 실패시 호출함수
    alert("채팅방 연결에 실패하였습니다.");
    history.replace("/");
  };

  const subCallback = (log) => {
    // 구독 콜백함수
    const newMassage = JSON.parse(log.body);

    if (newMassage.type === "ENTER" || newMassage.type === "ITEM") {
      const myName = newMassage.myName;
      const onlyMe = newMassage.onlyMe;
      if (!myName && !onlyMe) {
        // 아이템 사용자가 있으면 아이템 사용을 막음
        dispatch(actionCreators.setItemState(true));
      } else {
        dispatch(actionCreators.setItemState(false));
      }
    } else {
    }
    if (newMassage.type === "ENTER") {
      setMessageLog((log) => [...log, newMassage]);
    }
  };

  React.useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    // scrollRef의 element위치로 스크롤 이동 behavior는 전환 에니메이션의 정의
  }, [messageLog]);

  React.useEffect(() => {
    client.connect(headers, connectCallback, errorCallback);
    // connect(headers, connectCallback, errorCallback); : 헤더를 전달해야 하는 경우의 형식

    return () => client.disconnect(() => client.unsubscribe("sub-0"));
  }, []);

  return (
    <ShowChat>
      {messageLog.map((el, key) => {
        return <Chat {...el} key={key} />;
      })}
      <div ref={scrollRef} />
    </ShowChat>
  );
};

const ShowChat = styled.div`
  border: 1px solid red;
  height: 100%;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 10px;
`;

ChatBox.defaultProps = {
  messageLog: [],
};

export default ChatBox;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../redux/modules/item";
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
    // alert("채팅방 연결에 실패하였습니다.");
    // history.replace("/");
  };

  const subCallback = (log) => {
    // 구독 콜백함수
    const newMassage = JSON.parse(log.body);

    //메세지 추가
    setMessageLog((log) => [...log, newMassage]);

    if (newMassage.type === "ITEMTIMEOUT") {
      // 아이템 시간 종료시
      dispatch(actionCreators.clear());
      return;
    }

    if (newMassage.type === "ENTER" || newMassage.type === "ITEM") {
      // 입장시, 아이템 사용시 사용자 지정
      const myName = newMassage.myName;
      const onlyMe = newMassage.onlyMe;

      if (myName || onlyMe) {
        // 아이템 종류에 따른 분기
        dispatch(
          actionCreators.setUser(
            myName ? "myName" : "onlyMe",
            myName ? myName : onlyMe
          )
        );
        dispatch(actionCreators.setItemState(false));
        return;
      }
      dispatch(actionCreators.clear());
      return;
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
        console.log(el);
        return <Chat {...el} key={key} />;
      })}
      <div ref={scrollRef} />
    </ShowChat>
  );
};

const ShowChat = styled.div`
  flex-grow: 1;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  gap: 15px;

  padding: 10px;

  /* 스크롤바 표시 */
  &::-webkit-scrollbar {
    display: block;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    padding: 2px;
  }
`;

ChatBox.defaultProps = {
  messageLog: [],
};

export default ChatBox;
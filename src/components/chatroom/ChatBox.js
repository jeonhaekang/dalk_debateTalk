import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../redux/modules/item";
import { actionCreators as chatAction } from "../../redux/modules/chat";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import Chat from "./Chat";
import { history } from "../../redux/configStore";
import _ from "lodash";
import FlexGrid from "../../elements/FlexGrid";
import downButton from "../../image/chatRoom/downButton.svg";

const ChatBox = ({ roomId, headers, client }) => {
  React.useEffect(() => {
    client.connect(headers, connectCallback, errorCallback);
    // connect(headers, connectCallback, errorCallback); : 헤더를 전달해야 하는 경우의 형식

    dispatch(chatAction.loadMessageLogDB(roomId));

    window.addEventListener("beforeunload", (event) => {
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
    });

    return () => client.disconnect(() => client.unsubscribe("sub-0"), headers);
  }, []);

  const dispatch = useDispatch();

  const scrollRef = React.useRef();
  const boxRef = React.useRef(null);

  const messageLog = useSelector((props) => props.chat.currentRoom.messageLog);

  const EnterMessage = () => {
    setTimeout(() => {
      if (client.subscriptions["sub-0"]) {
        client.send(
          "/pub/chat/enter",
          headers,
          JSON.stringify({ type: "ENTER", roomId: roomId })
        );
      } else {
        EnterMessage();
      }
    }, 100);
  };

  const connectCallback = () => {
    // 연결 성공시 호출함수
    client.subscribe(`/sub/chat/${roomId}`, subCallback, headers);
    // subscribe("url", callback, headers)

    EnterMessage();
  };

  const errorCallback = () => {
    // 연결 실패시 호출함수
    dispatch(
      alertAction.open({
        message: "채팅방 연결에 실패하였습니다.",
        history: () => history.replace("/"),
      })
    );
  };

  const subCallback = (log) => {
    // 구독 콜백함수
    const newMessage = JSON.parse(log.body);

    //메세지 추가
    dispatch(chatAction.newMessage(newMessage));

    if (newMessage.type === "ITEMTIMEOUT") {
      // 아이템 시간 종료시
      dispatch(actionCreators.clear());
      return;
    }

    if (newMessage.type === "ENTER") {
      dispatch(chatAction.enterUser(newMessage.userInfo));
    }

    if (newMessage.type === "EXIT") {
      dispatch(chatAction.exitUser(newMessage.userInfo));
    }

    if (newMessage.type === "ENTER" || newMessage.type === "ITEM") {
      // 입장시, 누군가 아이템 사용시 사용중인 사용자 지정
      const myName = newMessage.myName; // myName을 사용중인 유저
      const onlyMe = newMessage.onlyMe; // onlyMe를 사용중인 유저
      const papago = newMessage.papago; // onlyMe를 사용중인 유저
      const reverse = newMessage.reverse; // onlyMe를 사용중인 유저

      if (myName || onlyMe || papago || reverse) {
        // 사용중인 유저가 있을시 유저를 셋팅하고 아이템 사용을 막음
        myName && dispatch(actionCreators.setUser("myName", myName));
        onlyMe && dispatch(actionCreators.setUser("onlyMe", onlyMe));
        papago && dispatch(actionCreators.setUser("papago", papago));
        reverse && dispatch(actionCreators.setUser("reverse", reverse));
        dispatch(actionCreators.setItemState(false));
        return;
      }
      // 사용중인 유저가 없으면 아이템을 사용 가능하게 함
      dispatch(actionCreators.clear());
    }
  };

  const [scrollState, setScrollState] = useState(true); // 자동 스크롤 여부
  const [endState, setEndState] = React.useState(false); // 아래로 버튼 등장 여부

  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    // 스크롤이 맨 아래에 있을때
    setEndState(
      scrollTop + clientHeight >= scrollHeight - clientHeight / 3 ? false : true
    );

    setScrollState(
      scrollTop + clientHeight >= scrollHeight - clientHeight / 5 ? true : false
    );
  }, 10);
  const scroll = React.useCallback(scrollEvent, []);

  const endScroll = () => {
    // setEndState(false);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (scrollState) {
      // scrollRef.current.scrollIntoView({ behavior: "smooth" });
      // scrollRef의 element위치로 스크롤 이동 behavior는 전환 에니메이션의 정의
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messageLog]);

  React.useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll);
  });

  return (
    <>
      <ShowChat ref={boxRef}>
        {messageLog.map((el, i) => {
          return <Chat {...el} key={i} boxRef={boxRef} />;
        })}
        <div ref={scrollRef} />
      </ShowChat>
      {endState && (
        <EndScroll src={downButton} alt="down" onClick={endScroll} />
      )}
    </>
  );
};

const EndScroll = styled.img`
  position: absolute;
  bottom: 76px;
  right: 16px;
`;

const ShowChat = styled.div`
  flex-grow: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 10px;
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Chat from "./Chat";
import _ from "lodash";
import downButton from "../../image/chatRoom/downButton.svg";
import { connectSocket } from "../../modules/chatSocket";
import { history } from "../../redux/configStore";

const ChatBox = ({ roomId, headers, client }) => {
  const scrollRef = React.useRef();
  const boxRef = React.useRef(null);

  React.useEffect(() => {
    connectSocket({ roomId, headers, client });

    const isOnIOS =
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Mac/i);
    const eventName = isOnIOS ? "pagehide" : "beforeunload";

    window.addEventListener("orientationchange", () => {
      console.log("체인지");
    });

    const visibleHendler = (e) => {
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
      history.replace("/");
    };

    window.addEventListener("visibilitychange", visibleHendler);

    window.addEventListener("beforeunload", (e) => {
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
    });

    return () => client.disconnect(() => client.unsubscribe("sub-0"), headers);
  }, []);

  const messageLog = useSelector((props) => props.chat.currentRoom.messageLog);

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

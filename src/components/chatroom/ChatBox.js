import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Chat from "./Chat";
import _ from "lodash";
import downButton from "../../image/chatRoom/downButton.svg";
import { connectSocket } from "../../modules/chatSocket";
import { history } from "../../redux/configStore";
import { mobileCheck } from "../../modules/mobileCheck";
import { actionCreators as chatAction } from "../../redux/modules/chat";
import { actionCreators as alertAction } from "../../redux/modules/alert";

const ChatBox = ({ roomId, headers, client }) => {
  const dispatch = useDispatch();
  const scrollRef = React.useRef();
  const boxRef = React.useRef(null);

  const visibleHendler = (e) => {
    const state = document.visibilityState === "hidden";
    const mobile = mobileCheck();

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

  React.useEffect(() => {
    dispatch(chatAction.loadMessageLogDB(roomId));
    connectSocket({ roomId, headers, client });

    window.addEventListener("visibilitychange", visibleHendler);

    window.addEventListener("beforeunload", (e) => {
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
    });

    return () => {
      window.removeEventListener("visibilitychange", visibleHendler);
      client.disconnect(() => client.unsubscribe("sub-0"), headers);
    };
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

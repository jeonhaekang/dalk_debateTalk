import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Chat from "./Chat";
import _ from "lodash";
import downButton from "../../image/chatRoom/downButton.svg";
import { actionCreators as chatAction } from "../../redux/modules/chat";

const ChatBox = ({ roomId, setMessageLoaded }) => {
  const dispatch = useDispatch();

  const boxRef = useRef(); // 채팅 박스 ref
  const scrollRef = useRef(); // 채팅 박스 맨 아래를 가르키는 ref

  const [scrollState, setScrollState] = useState(true); // 자동 스크롤 여부
  const [endButtonState, setEndButtonState] = useState(false); // 아래로 버튼 등장 여부

  const messageLog = useSelector((props) => props.chat.currentRoom.messageLog); // 메세지 로그

  //스크롤 이벤트 함수------------------------------------------------------------------------------------------------
  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    // 스크롤이 맨 아래에 있는지 검사
    const scrollState = scrollTop + clientHeight >= scrollHeight;
    setEndButtonState(scrollState ? false : true);
    setScrollState(scrollState ? true : false);
  }, 100);

  //이전 메세지 기록 호출 및 스크롤 이벤트 연결------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!boxRef.current) return;
    const _boxRef = boxRef.current;
    dispatch(chatAction.loadMessageLogDB(roomId)); // 이전 메세지 호출

    _boxRef.addEventListener("scroll", scrollEvent); // 채팅 박스 스크롤 이벤트
    return () => _boxRef.removeEventListener("scroll", scrollEvent);
  }, [boxRef]);

  //메세지 로딩 완료 및 신규 메세지 수신시 스크롤------------------------------------------------------------------------------------------------
  useEffect(() => {
    messageLog && setMessageLoaded(true); // 메세지 로딩완료

    scrollState && (boxRef.current.scrollTop = boxRef.current.scrollHeight);
    // 신규 메세지 수신시 스크롤
  }, [messageLog]);

  //채팅방 맨 밑으로 스크롤------------------------------------------------------------------------------------------------
  const endScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    // scrollRef의 element위치로 스크롤 이동 behavior는 전환 에니메이션의 정의
  };

  return (
    <>
      <ShowChat ref={boxRef}>
        {messageLog?.map((el, i) => {
          return <Chat {...el} key={i} boxRef={boxRef} />;
        })}
        <div ref={scrollRef} />
      </ShowChat>
      {endButtonState && (
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

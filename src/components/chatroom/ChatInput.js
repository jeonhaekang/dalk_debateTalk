import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import Input from "../../elements/Input";

const ChatInput = (props) => {
  const message = React.useRef();
  const { client, roomId, headers } = props;
  const [fontState, setFontState] = React.useState(false);
  const [state, setState] = React.useState(false);

  const itemState = useSelector((state) => state.item.itemState);
  const onlyMe = useSelector((state) => state.item.onlyMe);
  const user = useSelector((state) => state.user.user?.nickname);

  const sendMessage = () => {
    if (onlyMe && onlyMe !== user) {
      console.log("나만 말하기 발동!!!");
      return;
    }
    if (!message.current.value) {
      return;
    }
    const data = {
      type: "TALK",
      roomId: roomId,
      message: message.current.value,
      bigFont: fontState ? true : false,
    };

    client.send("/pub/chat/message", headers, JSON.stringify(data));
    // send(url(destination), headers, body)
    message.current.value = "";
  };

  const MessageEnter = (e) => {
    // enter입력시 메세지 전송
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const useItem = (e) => {
    if (!itemState) {
      alert("아이템을 사용할 수 없습니다.");
      return;
    }
    const data = {
      type: "ITEM",
      roomId: roomId,
      item: e.target.id,
    };

    client.send("/pub/chat/message", headers, JSON.stringify(data));
  };

  const useBigFont = () => {
    setFontState(true);

    setTimeout(() => {
      setFontState(false);
    }, 10000);
  };

  return (
    <Wrap>
      <InputWrap>
        <button onClick={() => setState(!state)}>아이템</button>
        <Input
          flexGrow="1"
          onKeyPress={MessageEnter}
          padding="10px"
          height="40px"
          ref={message}
        />
        <button onClick={sendMessage}>송신</button>
      </InputWrap>

      <ItemWrap state={state}>
        <ItemButton onClick={useBigFont}>빅폰트</ItemButton>
        <ItemButton id="onlyMe" onClick={useItem}>
          나만 말하기
        </ItemButton>
        <ItemButton id="myName" onClick={useItem}>
          이름 바꾸기
        </ItemButton>
        <ItemButton id="myName" onClick={useItem}>
          아이템 구매하기
        </ItemButton>
      </ItemWrap>
    </Wrap>
  );
};
const Wrap = styled.div`
  /* transition: 0.3s;
  &:hover {
    transform: translate(0, 50%);
  }
  overflow: hidden; */
`;

const InputWrap = styled.div`
  display: flex;
`;

const ItemWrap = styled.div`
  transition: 0.2s;
  padding: 0 15px;
  height: ${(props) => (props.state ? "120px" : "0px")};

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;

  overflow: scroll;
`;

const ItemButton = styled.button`
  width: 90px;
  height: 90px;

  flex-shrink: 0;
`;

export default ChatInput;

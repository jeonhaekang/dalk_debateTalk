import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import Input from "../../elements/Input";

const ChatInput = (props) => {
  const message = React.useRef();
  const { client, roomId, headers } = props;
  const [fontState, setFontState] = React.useState(false);
  console.log(fontState);
  const sendMessage = () => {
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

  const useBigFont = () => {
    setFontState(true);
    setTimeout(() => {
      setFontState(false);
    }, 10000);
  };

  return (
    <InputWrap>
      <Grid border="1px solid orange">
        <button onClick={useBigFont}>빅폰트</button>
      </Grid>
      <Grid>
        <Input
          onKeyPress={MessageEnter}
          padding="10px"
          height="40px"
          width="90%"
          ref={message}
        />
        <button onClick={sendMessage}>송신</button>
      </Grid>
    </InputWrap>
  );
};

const InputWrap = styled.div`
  height: 100px;
`;

export default ChatInput;

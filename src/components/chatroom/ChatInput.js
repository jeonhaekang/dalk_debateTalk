import React from "react";
import Grid from "../../elements/Grid";
import Input from "../../elements/Input";

const ChatInput = (props) => {
  const message = React.useRef();
  const { client, roomId, headers } = props;

  const sendMessage = () => {
    const data = {
      type: "TALK",
      roomId: roomId,
      message: message.current.value,
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

  return (
    <Grid
      position="absolute"
      bottom="0"
      border="1px solid black"
      width="100%"
      height="60px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Input
        onKeyPress={MessageEnter}
        padding="10px"
        height="40px"
        width="90%"
        ref={message}
      />
      <button onClick={sendMessage}>송신</button>
    </Grid>
  );
};

export default ChatInput;

import React from "react";
import Header from "../shared/Header";
import Input from "../elements/Input";
import Grid from "../elements/Grid";
import Text from "../elements/Text";

const ChatRoom = (props) => {
  return (
    <>
      <Header page="토론방" />
      <Grid
        display="flex"
        flexDirection="column"
        gap="20px"
        height="calc(100% - 50px)"
        border="1px solid orange"
      >
        <Grid display="flex" justifyContent="space-between">
          <Grid>신고</Grid>
          <Grid>삭제</Grid>
        </Grid>
        <Grid textAlign="center">08:00:00</Grid>
        <Grid display="flex" justifyContent="space-around">
          <Grid>짜장면</Grid>
          <Grid>vs</Grid>
          <Grid>짬뽕</Grid>
        </Grid>
        <Grid border="1px solid red" height="100%" marginBottom="60px">
          채팅방
        </Grid>
      </Grid>
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
        <Input padding="10px" height="40px" width="90%" />
      </Grid>
    </>
  );
};

ChatRoom.defaultProps = {};

export default ChatRoom;

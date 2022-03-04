import React from "react";
import Grid from "../../elements/Grid";
import apis from "../../shared/apis";
import CountDownTimer from "./CountDownTimer";

const RoomInfo = ({ roomId }) => {
  const [roomData, setRoomData] = React.useState();

  React.useEffect(() => {
    apis
      .getOneRoom(roomId)
      .then((res) => {
        console.log(res);
        setRoomData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const restTime = 1200;

  return (
    <>
      <Grid display="flex" justifyContent="space-between">
        <Grid>신고</Grid>
        <Grid>삭제</Grid>
      </Grid>
      <Grid textAlign="center">
        <CountDownTimer restTime={restTime} />
      </Grid>
      <Grid display="flex" justifyContent="space-around">
        <Grid>짜장면</Grid>
        <Grid>vs</Grid>
        <Grid>짬뽕</Grid>
      </Grid>
    </>
  );
};

export default RoomInfo;

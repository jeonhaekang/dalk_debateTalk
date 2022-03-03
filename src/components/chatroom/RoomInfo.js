import React from "react";
import Grid from "../../elements/Grid";

const RoomInfo = () => {
  return (
    <>
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
    </>
  );
};

export default RoomInfo;

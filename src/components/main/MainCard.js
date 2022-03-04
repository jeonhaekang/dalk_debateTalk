import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import { history } from "../../redux/configStore";
import Blind from "../shared/Blind";

const MainCard = (props) => {
  const { topicA, topicB, category, userInfo, warnCnt } = props;

  return (
    <CardWrap
      warnCnt={warnCnt}
      onClick={() => {
        history.push("/chatroom/" + props.roomId);
      }}
    >
      {warnCnt >= 10 && <Blind>블라인드 처리된 채팅방</Blind>}
      <Grid>
        {topicA} vs {topicB}
      </Grid>
      <Grid>#{category}</Grid>
      <Grid display="flex" gap="10px">
        <Grid>뱃지</Grid>
        <Grid>{userInfo.nickname}</Grid>
        <Grid>방번호 : {props.roomId}</Grid>
      </Grid>
    </CardWrap>
  );
};

MainCard.defaultProps = {};

const CardWrap = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  position: relative;
`;

export default MainCard;

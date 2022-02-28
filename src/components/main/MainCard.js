import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import Blind from "../shared/Blind";

const MainCard = (props) => {
  const { warnCnt } = props;

  return (
    <CardWrap warnCnt={warnCnt}>
      {warnCnt >= 10 && <Blind>블라인드 처리된 채팅방</Blind>}
      <Grid>토론 주제</Grid>
      <Grid>#카테고리</Grid>
      <Grid display="flex" gap="10px">
        <Grid>뱃지</Grid>
        <Grid>닉네임</Grid>
        <Grid>작성일 2022-02-25</Grid>
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

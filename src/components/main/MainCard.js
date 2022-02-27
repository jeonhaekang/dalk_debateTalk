import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";

const MainCard = (props) => {
  return (
    <CardWrap>
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
  border: 3px solid black;
`;

export default MainCard;

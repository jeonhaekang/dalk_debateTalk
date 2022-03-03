import React from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import CommentList from "../components/detail/CommentList";
import CommentWrite from "../components/detail/CommentWrite";
import ShareLink from "../components/shared/ShareLink";

import Header from "../shared/Header"

const Detail = (props) => {
  return (
  <>
  <Header />
  <DetailCreatedAt>2022-03-01</DetailCreatedAt>
        <Grid display="flex" justifyContent="center" margin="30px">
            <Grid display="flex" justifyContent="center" margin="30px">주제1</Grid>
            <Grid display="flex" justifyContent="center" margin="30px">
                주제2
            </Grid>
        </Grid>
            {/* 부모 승리 state 설정 : bollean 값에 따라 주제1 또는 주제 2 승리 위치변경  */}
            <Grid display="flex" justifyContent="center" margin="30px">
                승리!!!!
            </Grid>
    <ShareLink />
    <CommentWrite />
    <CommentList />
  </>
  )
};

const DetailCreatedAt = styled.div`
  display: flex;
  justify-content: flex-end;
  margin : 10px;
  font-size: 12px;
  color: gray;
`

export default Detail;

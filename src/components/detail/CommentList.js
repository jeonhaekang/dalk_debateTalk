import React from "react";
import Button from "../../elements/Button";
import Grid from '../../elements/Grid'

const CommentList = (props) => {
  return (
  <Grid display="flex">
      <div>뱃지</div>
      <div>닉네임</div>
      <div>댓글내용</div>
      <div>작성날짜</div>
      <div>좋아요 수</div>
      <Button>좋아요</Button>
      <Button>댓글삭제</Button>
  </Grid>
  )
};

export default CommentList;
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import OneComment from "./OneComment";

const CommentList = ({ debate }) => {
  const boardId = debate.boardId;

  const commentList = useSelector((state) => state.comment.commentList);

  return (
    <CommentListWrap>
      {commentList.map((c, idx) => {
        return <OneComment index={idx} {...c} key={idx} boardId={boardId} />;
      })}
    </CommentListWrap>
  );
};

const CommentListWrap = styled.div`
  background-color: black;
`;

export default CommentList;

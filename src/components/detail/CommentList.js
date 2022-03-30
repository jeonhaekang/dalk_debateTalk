import React from "react";
import { useSelector } from "react-redux";

import OneComment from "./OneComment";

const CommentList = ({ debate }) => {
  const boardId = debate.boardId;

  const commentList = useSelector((state) => state.comment.commentList);

  return (
    <>
      {commentList.map((c, idx) => {
        return <OneComment index={idx} {...c} key={idx} boardId={boardId} />;
      })}
    </>
  );
};

export default CommentList;

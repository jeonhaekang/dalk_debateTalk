import React from "react";
import CommentList from "../components/detail/CommentList";
import CommentWrite from "../components/detail/CommentWrite";
import DetailCard from "../components/detail/DetailCard";

const Detail = (props) => {
  return (
  <>
  <div>작성일</div>
    <DetailCard />
    <CommentWrite />
    <CommentList />
  </>
  )
};

export default Detail;

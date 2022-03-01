import React from "react";
import styled from "styled-components";
import CommentList from "../components/detail/CommentList";
import CommentWrite from "../components/detail/CommentWrite";
import DetailCard from "../components/detail/DetailCard";

import Header from "../shared/Header"

const Detail = (props) => {
  return (
  <>
  <Header />
  <DetailCreatedAt>2022-03-01</DetailCreatedAt>
    <DetailCard />
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

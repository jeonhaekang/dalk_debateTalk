import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import CommentList from "../components/detail/CommentList";
import ShareLink from "../components/shared/ShareLink";

import Header from "../shared/Header"
import apis from "../shared/apis";

const Detail = (props) => {
  
  // 결과창 리스트에 있는 boardId 값 
  const boardId = props.match.params.boardId;

  // DB에 받아오는 필요한 Data 정보 : 주제A, 주제B, 이긴주제, 내용,
  const [debate, setDebate] = useState([]);
  const [createdAt, setCreatedAt] = useState("");

  // Data 받아오기
  const getOneDebateDB = async () => {
    await apis
    .getOneDebate(boardId)
    .then((res) => {
      setDebate(res.data);
      setCreatedAt(res.data.createdAt.split("T")[0])
    })
    .catch((err) => {
      console.log("게시글 상세정보 에러", err)
    })
  }

  // 렌더링때 DB 불러오기
  useEffect(() => {
    getOneDebateDB()
  }, [])

  return (
  <>
  <Header />
  <DetailCreatedAt>{createdAt}</DetailCreatedAt>
        <Grid display="flex" justifyContent="center" margin="30px">
            <Grid display="flex" justifyContent="center" margin="30px">{debate.topicA}</Grid>
            <Grid display="flex" justifyContent="center" margin="30px">
                {debate.topicB}
            </Grid>
        </Grid>
            {/* 부모 승리 state 설정 : bollean 값에 따라 주제1 또는 주제 2 승리 위치변경  */}
            <Grid display="flex" justifyContent="center" margin="30px">
                {debate.winner}
            </Grid>
    {/* 공유하기 기능 */}
    <ShareLink />

    {/* 댓글 전체 */}
    {/* {debate.length > 0 && <CommentList debate={debate} /> } */}
    {<CommentList debate={debate}  /> }
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

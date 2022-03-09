import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import CommentList from "../components/detail/CommentList";
import ShareLink from "../components/shared/ShareLink";

import Header from "../shared/Header";
import apis from "../shared/apis";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Detail = (props) => {
  const dispatch = useDispatch();

  // 결과창 리스트에 있는 boardId 값
  const boardId = props.match.params.boardId;

  // DB에 받아오는 필요한 Data 정보 : 주제A, 주제B, 이긴주제, 내용,
  const [debate, setDebate] = useState({});
  console.log(debate);
  const [comment, setComment] =useState();

  // 상세 게시글의 Data 받아오기
  const getOneDebateDB = async () => {
    await apis
      .getOneDebate(boardId)
      .then((res) => {
        setDebate(res.data);
        // setCreatedAt(res.data.createdAt.split("T")[0])
      })
      .catch((err) => {
        console.log("게시글 상세정보 에러", err);
      });
  };

  // 렌더링때 게시글 + 댓글DB 불러오기
  useEffect(() => {
    //상세 게시글 DB불러오는 구문임
    getOneDebateDB();
  }, []);

  useEffect(() => {
    //댓글 코멘트 불러오는 구문임
    dispatch(commentActions.getCommentDB(boardId));
  }, []);

  return (
    <>
      <Header />
      <Grid height="calc(100% - 130px)" overflow="scroll">
        <DetailCreatedAt>{debate.createdAt}</DetailCreatedAt>
        <DebateWrap>
          <DebateBox>
            {debate.topicA}
            <p>11%</p>
          </DebateBox>
          <Versus>
            VS
          </Versus>
          <DebateWinnerBox>
            {debate.topicB}
            <p>89%</p>
          </DebateWinnerBox>
        </DebateWrap>
        {/* 공유하기 기능 */}
        <ShareLink />

        {/* 댓글 전체 */}
        {/* {debate.length > 0 && <CommentList debate={debate} /> } */}
        {<CommentList debate={debate} />}
      </Grid>
    </>
  );
};

const DetailCreatedAt = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 16px;
  font-size: 12px;
  color: gray;
`;

const DebateWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

const DebateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #E0E0E0;
  font-size: 20px;
  border: none;
  border-radius: 15px;
  width: 184px;
  height: 232px;
  margin: 0px 5px;
`

const Versus = styled.div`
  position: absolute;
  transform: translate(0px, 88px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #C4C4C4;
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
`

const DebateWinnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F6D629;
  font-weight: bold;
  font-size: 24px;
  border: none;
  border-radius: 15px;
  width: 184px;
  height: 232px;
  margin: 0px 5px;
`

export default Detail;

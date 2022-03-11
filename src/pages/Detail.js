import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import FlexGrid from "../elements/FlexGrid";
import CommentList from "../components/detail/CommentList";
import ShareLink from "../components/shared/ShareLink";
import detail1 from "../image/detailElement/allRP.png"
import detail2 from "../image/detailElement/pickPeople.png"
import detail3 from "../image/detailElement/rate.png"
import detail4 from "../image/detailElement/topPoint.png"

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
  const [comment, setComment] = useState();

  // 상세 게시글의 Data 받아오기
  const getOneDebateDB = async () => {
    await apis
      .getOneDebate(boardId)
      .then((res) => {
        console.log(res.data);
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

  const winnerRate = Math.round((Number(debate.winnerResponse?.cnt) / (Number(debate.winnerResponse?.cnt) + Number(debate.loserResponse?.cnt))) * 100);
  const loserRate = Math.round((Number(debate.loserResponse?.cnt) / (Number(debate.winnerResponse?.cnt) + Number(debate.loserResponse?.cnt))) * 100);

  return (
    <>
      <Header />
      <Grid height="calc(100% - 130px)" overflow="scroll">
        <DetailCreatedAt>{debate.createdAt}</DetailCreatedAt>
        <DebateWrap>
          {(winnerRate !== loserRate) ?
            <>
              <DebateWinnerBox>
                <WinnerTitleBox>
                  {debate.winnerResponse?.topic}
                  <p>{winnerRate}%</p>
                </WinnerTitleBox>
                <DetailBox>
                  <ImageBox>
                    <img src={detail1} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>총 {debate.winnerResponse?.totalPoint} RP</div>
                  </ImageBox>
                  <ImageBox>
                    <img src={detail2} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>{debate.winnerResponse?.cnt}명 선택</div>
                  </ImageBox>
                  <ImageBox>
                    <img src={detail3} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>최고 {debate.winnerResponse?.topPoint} RP</div>
                  </ImageBox>
                  <ImageBox>
                    <img src={detail4} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>배당률 : {debate.winnerResponse?.rate}</div>
                  </ImageBox>
                </DetailBox>
              </DebateWinnerBox>
              <Versus>VS</Versus>
              <DebateLoserBox>
                <LoserTitleBox>
                  {debate.loserResponse?.topic}
                  <p>{loserRate}%</p>
                </LoserTitleBox>
                <DetailBox>
                  <ImageBox>
                    <img src={detail1} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>총 {debate.loserResponse?.totalPoint}RP</div>
                  </ImageBox>
                  <ImageBox>
                    <img src={detail2} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>{debate.loserResponse?.cnt}명 선택</div>
                  </ImageBox>
                  <ImageBox>
                    <img src={detail3} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>최고 {debate.loserResponse?.topPoint}RP</div>
                  </ImageBox>
                  <ImageBox>
                    <img src={detail4} width="12" height="12" style={{ marginRight: "5px" }} />
                    <div>배당률 : {debate.loserResponse?.rate}</div>
                  </ImageBox>
                </DetailBox>
              </DebateLoserBox>
            </>
            :
            <>
              <DebateWinnerBox>
                <WinnerTitleBox>
                  {debate.winnerResponse?.topic}
                  <p>{winnerRate}%</p>
                </WinnerTitleBox>
                <DetailBox>
                  <div>총 {debate.winnerResponse?.totalPoint} RP</div>
                  <div>{debate.winnerResponse?.cnt}명 선택</div>
                  <div>최고 {debate.winnerResponse?.topPoint} RP</div>
                  <div>배당률 : {debate.winnerResponse?.rate}</div>
                </DetailBox>
              </DebateWinnerBox>
              <Versus>VS</Versus>
              <DebateWinnerBox>
                {debate.loserResponse?.topic}
                <p>{loserRate}%</p>
                <div>총 {debate.loserResponse?.totalPoint}RP</div>
                <div>{debate.loserResponse?.cnt}명 선택</div>
                <div>최고 {debate.loserResponse?.topPoint}RP</div>
                <div>배당률 : {debate.loserResponse?.rate}</div>
              </DebateWinnerBox>
            </>
          }
        </DebateWrap>
        {/* 공유하기 기능 */}
        <ShareLink />

        {/* 댓글 전체 */}
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
const DebateLoserBox = styled.div`
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
  border: none;
  border-radius: 15px;
  width: 184px;
  height: 232px;
  margin: 0px 5px;
`
const WinnerTitleBox = styled.div`
  font-size: 32px;
`
const LoserTitleBox = styled.div`
  font-size: 24px;
`
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`
const ImageBox = styled.div`
  display: flex;
  align-items: center;
`

export default Detail;

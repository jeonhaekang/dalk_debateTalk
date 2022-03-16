import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import CommentList from "../components/detail/CommentList";
import ShareLink from "../components/shared/ShareLink";
import { history } from "../redux/configStore";

import detail1 from "../image/detailElement/allRP.png"
import detail2 from "../image/detailElement/pickPeople.png"
import detail3 from "../image/detailElement/rate.png"
import detail4 from "../image/detailElement/topPoint.png"

import Header from "../shared/Header";
import apis from "../shared/apis";
import Modal from "../components/shared/Modal";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as alertAction } from "../redux/modules/alert";

const Detail = (props) => {
  const dispatch = useDispatch();
  //유저, 토큰 정보
  const token = document.cookie;
  const tokenCheck = token.split("=")[1];
  const user = useSelector(state => state.user.user)

  // 결과창 리스트에 있는 boardId 값
  const boardId = props.match.params.boardId;

  // DB에 받아오는 필요한 Data 정보 : 주제A, 주제B, 이긴주제, 내용,
  const [debate, setDebate] = useState({});

  // 상세 게시글의 Data 받아오기
  const getOneDebateDB = async () => {
    await apis
      .getOneDebate(boardId)
      .then((res) => {
        console.log(res.data);
        setDebate(res.data);
      })
      .catch((err) => {
        console.log("게시글 상세정보 에러", err);
      });
  };

  // 렌더링때 게시글 + 댓글DB 불러오기
  useEffect(() => {
    getOneDebateDB();
    dispatch(commentActions.getCommentDB(boardId));
  }, []);

  //승률 구하기
  const winnerRate =
    Math.round((Number(debate.winnerResponse?.cnt) / (Number(debate.winnerResponse?.cnt)
      + Number(debate.loserResponse?.cnt))) * 100);

  const loserRate =
    Math.round((Number(debate.loserResponse?.cnt) / (Number(debate.winnerResponse?.cnt)
      + Number(debate.loserResponse?.cnt))) * 100);

  //신고 기능
  const [isWarn, setIsWarn] = useState(false);

  const handleClickWarning = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tokenCheck) {
      dispatch(alertAction.open({
        message: "로그인이 필요한 서비스입니다"
      }))
      history.replace("/login");
    }
    if (isWarn === false) {
      await apis
        .warningDebate(boardId)
        .then((res) => {
          if (window.confirm("정말 신고하시겠어요?")) {
            console.log("상세페이지 신고 성공", res);
            setIsWarn(true);
            dispatch(alertAction.open({
              message: "신고처리가 완료되었습니다"
            }));
          } else {
            return;
          }
        })
        .catch((err) => {
          console.log("상세페이지 신고하기 에러", err);
        });
    } else {
      dispatch(alertAction.open({
        message: "이미 신고를 하셨습니다"
      }))
      return;
    }
  };

  //모달
  const [createModalState, setCreateModalState] = useState(false);

  return (
    <>
      <Header />
      <Grid height="calc(100% - 130px)" overflow="scroll">
        <DetailCreatedAt>
          {debate.createdAt}
          <WarnShareBox>
            <div style={{ marginRight: "5px", cursor: "pointer" }}
              onClick={handleClickWarning}>
              {debate.warnUserList?.includes(user?.id) ? null : "신고"}
            </div>
            <div onClick={() => setCreateModalState(true)} style={{cursor:"pointer"}}>
              공유
            </div>
            <Modal modalState={createModalState} setModalState={setCreateModalState}>
              {/* 공유하기 기능 */}
              <ShareLink createModalState={createModalState} setCreateModalState={setCreateModalState} />
            </Modal>
          </WarnShareBox>
        </DetailCreatedAt>
        <DebateWrap>
          {(winnerRate !== loserRate) ?
            <>
              <DebateWinnerBox>
                <WinnerTitleBox>
                  {debate.winnerResponse?.topic}
                  <p>{winnerRate}%</p>
                </WinnerTitleBox>
                <DetailBox1>
                  <Box>
                    <DetailImg src={detail1} />
                    <div>총 {debate.winnerResponse?.totalPoint} RP</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail3} />
                    <div>최고 {debate.winnerResponse?.topPoint} RP</div>
                  </Box>
                </DetailBox1>
                <DetailBox2>
                  <Box>
                    <DetailImg src={detail2} />
                    <div>{debate.winnerResponse?.cnt}명 선택</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail4} />
                    <div>배당 : {debate.winnerResponse?.rate}</div>
                  </Box>
                </DetailBox2>
              </DebateWinnerBox>
              <Versus>VS</Versus>
              <DebateLoserBox>
                <LoserTitleBox>
                  {debate.loserResponse?.topic}
                  <p>{loserRate}%</p>
                </LoserTitleBox>
                <DetailBox1>
                  <Box>
                    <DetailImg src={detail1} />
                    <div>총 {debate.loserResponse?.totalPoint} RP</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail3} />
                    <div>최고 {debate.loserResponse?.topPoint} RP</div>
                  </Box>
                </DetailBox1>
                <DetailBox2>
                  <Box>
                    <DetailImg src={detail2} />
                    <div>{debate.loserResponse?.cnt}명 선택</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail4} />
                    <div>배당 : {debate.loserResponse?.rate}</div>
                  </Box>
                </DetailBox2>
              </DebateLoserBox>
            </>
            :
            <>
              <DebateWinnerBox>
                <WinnerTitleBox>
                  {debate.winnerResponse?.topic}
                  <p>{winnerRate}%</p>
                </WinnerTitleBox>
                <DetailBox1>
                  <Box>
                    <DetailImg src={detail1} />
                    <div>총 {debate.winnerResponse?.totalPoint} RP</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail3} />
                    <div>최고 {debate.winnerResponse?.topPoint} RP</div>
                  </Box>
                </DetailBox1>
                <DetailBox2>
                  <Box>
                    <DetailImg src={detail2} />
                    <div>{debate.winnerResponse?.cnt}명 선택</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail4} />
                    <div>배당 : {debate.winnerResponse?.rate}</div>
                  </Box>
                </DetailBox2>
              </DebateWinnerBox>
              <Versus>VS</Versus>
              <DebateWinnerBox>
                <WinnerTitleBox>
                  {debate.loserResponse?.topic}
                  <p>{loserRate}%</p>
                </WinnerTitleBox>
                <DetailBox1>
                  <Box>
                    <DetailImg src={detail1} />
                    <div>총 {debate.loserResponse?.totalPoint}RP</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail3} />
                    <div>최고 {debate.loserResponse?.topPoint}RP</div>
                  </Box>
                </DetailBox1>
                <DetailBox2>
                  <Box>
                    <DetailImg src={detail2} />
                    <div>{debate.loserResponse?.cnt}명 선택</div>
                  </Box>
                  <Box>
                    <DetailImg src={detail4} />
                    <div>배당 : {debate.loserResponse?.rate}</div>
                  </Box>
                </DetailBox2>
              </DebateWinnerBox>
            </>
          }
        </DebateWrap>

        {/* 댓글 전체 */}
        {<CommentList debate={debate} />}
      </Grid>
    </>
  );
};
const DetailCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 16px;
  padding: 0px 10px;
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
  font-size: 28px;
  padding-bottom: 40px;
  text-align: center;
`
const LoserTitleBox = styled.div`
  font-size: 24px;
  padding-bottom: 40px;
  text-align: center;
`
const DetailBox1 = styled.div`
  position: absolute;
  transform: translate(-14px, 70px);
  font-size: 12px;
`
const DetailBox2 = styled.div`
  position: absolute;
  transform: translate(88px, 70px);
  font-size: 12px;
`
const Box = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
`
const DetailImg = styled.img`  
  width: 12px;
  height: 12px;
  margin-right: 4px;
`
const WarnShareBox = styled.div`
  display: flex;
`

export default Detail;

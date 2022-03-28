import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apis from "../shared/apis";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as alertAction } from "../redux/modules/alert";

import NewHeader from "../shared/NewHeader";
import Modal from "../components/shared/Modal";
import ShareLink from "../components/shared/ShareLink";
import CommentList from "../components/detail/CommentList";

import Text from "../elements/Text";
import FlexGrid from "../elements/FlexGrid";

import detailLogo from "../image/detailElement/detaillogo.svg";
import detailLogoFill from "../image/detailElement/detaillogofill.svg";
import egg from "../image/detailElement/egg.svg";
import person from "../image/detailElement/person.svg";
import thumbUp from "../image/detailElement/thumb_up_black.svg";
import trendingUp from "../image/detailElement/trending_up.svg";
import eggFill from "../image/detailElement/egg_fill.svg";
import personFill from "../image/detailElement/person_fill.svg";
import thumbUpFill from "../image/detailElement/thumb_up_black_fill.svg";
import trendingUpFill from "../image/detailElement/trending_up_fill.svg";
import { getCookie } from "../shared/Cookie";

const Detail = (props) => {
  const dispatch = useDispatch();
  //유저, 토큰 정보
  const token = getCookie("authorization");

  // 결과창 리스트에 있는 boardId 값
  const boardId = props.match.params.boardId;

  // DB에 받아오는 필요한 Data 정보 : 주제A, 주제B, 이긴주제, 내용,
  const [debate, setDebate] = useState({});

  // 상세 게시글의 Data 받아오기
  const getOneDebateDB = async () => {
    await apis
      .getOneDebate(boardId)
      .then((res) => {
        setDebate(res.data);
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "상세창 가져오기 실패",
          })
        );
      });
  };

  // 렌더링때 게시글 + 댓글DB 불러오기
  useEffect(() => {
    getOneDebateDB();
    dispatch(commentActions.getCommentDB(boardId));
  }, []);

  //승률 구하기
  const winnerRate = Math.round(
    (Number(debate.winnerResponse?.cnt) /
      (Number(debate.winnerResponse?.cnt) +
        Number(debate.loserResponse?.cnt))) *
      100
  );

  const loserRate = Math.round(
    (Number(debate.loserResponse?.cnt) /
      (Number(debate.winnerResponse?.cnt) +
        Number(debate.loserResponse?.cnt))) *
      100
  );

  //신고 기능
  const [isWarn, setIsWarn] = useState(false);

  const handleClickWarning = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      dispatch(
        alertAction.open({
          message: "로그인이 필요한 서비스입니다",
        })
      );
      history.replace("/login");
    }
    else if (isWarn === false) {
      await apis
        .warningDebate(boardId)
        .then((res) => {
          setIsWarn(true);
          dispatch(
            alertAction.open({
              message: "신고처리가 완료되었습니다",
            })
          );
        })
        .catch((err) => {
          dispatch(
            alertAction.open({
              message: "이미 신고를 하셨습니다",
            })
          );
          return;
        });
    } else {
      dispatch(
        alertAction.open({
          message: "이미 신고를 하셨습니다",
        })
      );
      return;
    }
  };

  // 공유하기 창 모달
  const [createModalState, setCreateModalState] = useState(false);
  const shareModal = () => {
    setCreateModalState(true);
  };

  return (
    <>
      <NewHeader page="완료된 토론" meatball boardId={boardId} debate={debate}>
        {/* 헤더 미트볼 관련 신고하기 + 공유하기 */}
        <FlexGrid _onClick={handleClickWarning}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <path
              d="M21.5 19.8621V12.9656C21.5 8.73109 19.45 5.18628 15.875 4.24835C15.875 4.24835 15.0375 4 14 4C12.9625 4 12.125 4.24824 12.125 4.24824C8.5375 5.18617 6.5 8.7173 6.5 12.9656V19.8621H4V24H24V19.8621H21.5ZM15.25 19.8621H12.75V17.1035H15.25V19.8621ZM15.25 14.3449H12.75V8.82764H15.25V14.3449Z"
              fill="#FF6969"
            />
          </svg>
          <Text marginBottom="3px" color="alert">
            신고하기
          </Text>
        </FlexGrid>
        <FlexGrid _onClick={shareModal}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <path
              d="M21 18.7602C20.1133 18.7602 19.32 19.1102 18.7133 19.6585L10.395 14.8168C10.4533 14.5485 10.5 14.2802 10.5 14.0002C10.5 13.7202 10.4533 13.4518 10.395 13.1835L18.62 8.3885C19.25 8.97183 20.0783 9.3335 21 9.3335C22.9367 9.3335 24.5 7.77016 24.5 5.8335C24.5 3.89683 22.9367 2.3335 21 2.3335C19.0633 2.3335 17.5 3.89683 17.5 5.8335C17.5 6.1135 17.5467 6.38183 17.605 6.65016L9.38 11.4452C8.75 10.8618 7.92167 10.5002 7 10.5002C5.06333 10.5002 3.5 12.0635 3.5 14.0002C3.5 15.9368 5.06333 17.5002 7 17.5002C7.92167 17.5002 8.75 17.1385 9.38 16.5552L17.6867 21.4085C17.6283 21.6535 17.5933 21.9102 17.5933 22.1668C17.5933 24.0452 19.1217 25.5735 21 25.5735C22.8783 25.5735 24.4067 24.0452 24.4067 22.1668C24.4067 20.2885 22.8783 18.7602 21 18.7602Z"
              fill="#333333"
            />
          </svg>
          <Text marginBottom="3px" color="black">
            공유하기
          </Text>
        </FlexGrid>
      </NewHeader>

      {/* 무승부일때, 승부가 났을 때 두가지 케이스 */}
      <DetailWrap>
        <DebateWrap>
          {winnerRate !== loserRate ? (
            // 무승부가 아닌 승리, 패배 결과가 나왔을 때
            <FlexGrid gap="0">
              <DebateBox win={true} is_column center gap="0px">
                <DetailLogo center gap="4px">
                  <img src={detailLogoFill} alt="detaillogofill" />
                  <div style={{ color: "#f19121" }}> WIN </div>
                </DetailLogo>
                <TitleBox win={true}>{debate.winnerResponse?.topic}</TitleBox>
                <DetailBox section={true}>
                  <Box>
                    <DetailImg src={eggFill} />
                    <div style={{ color: "#F19121" }}>
                      총 {debate.winnerResponse?.totalPoint} RP
                    </div>
                  </Box>
                  <Box>
                    <DetailImg src={thumbUpFill} />
                    <div style={{ color: "#F19121" }}>
                      최고 {debate.winnerResponse?.topPoint} RP
                    </div>
                  </Box>
                </DetailBox>
                <DetailBox section={false}>
                  <Box>
                    <DetailImg src={personFill} />
                    <div style={{ color: "#F19121" }}>
                      {debate.winnerResponse?.cnt}명 선택
                    </div>
                  </Box>
                  <Box>
                    <DetailImg src={trendingUpFill} />
                    <div style={{ color: "#F19121" }}>
                      배당 : {debate.winnerResponse?.rate}
                    </div>
                  </Box>
                </DetailBox>

                <GrapGauge which={true} rate={winnerRate} />
              </DebateBox>            
              <DebateBox win={false} is_column center gap="0px">
                <DetailLogo center gap="4px">
                  <img src={detailLogo} alt="detaillogo" />
                  <div style={{ fontSize: "14px" }}> LOSE </div>
                </DetailLogo>
                <TitleBox win={false}>{debate.loserResponse?.topic}</TitleBox>
                <LoserDetailBox section={true}>
                  <Box>
                    <DetailImg src={egg} />
                    <div>총 {debate.loserResponse?.totalPoint} RP</div>
                  </Box>
                  <Box>
                    <DetailImg src={thumbUp} />
                    <div>최고 {debate.loserResponse?.topPoint} RP</div>
                  </Box>
                </LoserDetailBox>
                <LoserDetailBox section={false}>
                  <Box>
                    <DetailImg src={person} />
                    <div>{debate.loserResponse?.cnt}명 선택</div>
                  </Box>
                  <Box>
                    <DetailImg src={trendingUp} />
                    <div>배당 : {debate.loserResponse?.rate}</div>
                  </Box>
                </LoserDetailBox>

                <GrapGauge which={false} rate={loserRate} />
              </DebateBox>
              <Versus center>VS</Versus>
            </FlexGrid>
          ) : (
            // 무승부일때: DRAW 표시 되면서 둘다 색깔 불 들어옴
            <FlexGrid gap="0" backgroundColor="#fff">
              <DebateBox win={true} is_column center gap="0px">
                <DetailLogo center gap="4px">
                  <img src={detailLogoFill} alt="detaillogofill" />
                  <div style={{ color: "#f19121" }}> DRAW </div>
                </DetailLogo>
                <TitleBox win={true}>{debate.winnerResponse?.topic}</TitleBox>
                <DetailBox section={true}>
                  <Box>
                    <DetailImg src={eggFill} />
                    <div style={{ color: "#F19121" }}>
                      총 {debate.winnerResponse?.totalPoint} RP
                    </div>
                  </Box>
                  <Box>
                    <DetailImg src={thumbUpFill} />
                    <div style={{ color: "#F19121" }}>
                      최고 {debate.winnerResponse?.topPoint} RP
                    </div>
                  </Box>
                </DetailBox>
                <DetailBox section={false}>
                  <Box>
                    <DetailImg src={personFill} />
                    <div style={{ color: "#F19121" }}>
                      {debate.winnerResponse?.cnt}명 선택
                    </div>
                  </Box>
                  <Box>
                    <DetailImg src={thumbUpFill} />
                    <div style={{ color: "#F19121" }}>
                      배당 : {debate.winnerResponse?.rate}
                    </div>
                  </Box>
                </DetailBox>

                <GrapGauge which={true} rate={winnerRate} />
              </DebateBox>
              <DebateBox win={true} is_column center gap="0px">
                <DetailLogo center gap="4px">
                  <img src={detailLogoFill} alt="detaillogofill" />
                  <div style={{ color: "#f19121" }}> DRAW </div>
                </DetailLogo>
                <TitleBox win={true}>{debate.loserResponse?.topic}</TitleBox>
                <DetailBox section={true}>
                  <Box>
                    <DetailImg src={eggFill} />
                    <div style={{ color: "#F19121" }}>
                      총 {debate.loserResponse?.totalPoint}RP
                    </div>
                  </Box>
                  <Box>
                    <DetailImg src={thumbUpFill} />
                    <div style={{ color: "#F19121" }}>
                      최고 {debate.loserResponse?.topPoint}RP
                    </div>
                  </Box>
                </DetailBox>
                <DetailBox section={false}>
                  <Box>
                    <DetailImg src={personFill} />
                    <div style={{ color: "#F19121" }}>
                      {debate.loserResponse?.cnt}명 선택
                    </div>
                  </Box>
                  <Box>
                    <DetailImg src={trendingUpFill} />
                    <div style={{ color: "#F19121" }}>
                      배당 : {debate.loserResponse?.rate}
                    </div>
                  </Box>
                </DetailBox>

                <GrapGauge which={false} rate={loserRate} />
              </DebateBox>
              <Versus center>VS</Versus>
            </FlexGrid>
          )}
        </DebateWrap>

        {/* 댓글 전체 */}
        {<CommentList debate={debate} />}
      </DetailWrap>

      {createModalState && (
        <Modal
          modalState={createModalState}
          setModalState={setCreateModalState}
        >
          {/* 공유하기 기능 */}
          <ShareLink
            createModalState={createModalState}
            setCreateModalState={setCreateModalState}
          />
        </Modal>
      )}
    </>
  );
};

const DetailWrap = styled.div`
  height: calc(100% - 130px);
  overflow: scroll;
  background-color: #f0f0f0;
`

const DebateWrap = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;
`;

const Versus = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  color: ${(props) => props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.black};
`;

const DebateBox = styled(FlexGrid)`
  background-color: ${(props) =>
    props.win ? "#fefefe" : "rgba(196, 196, 196, 0.1)"};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  border: none;
  width: 50%;
  height: 232px;
  position: relative;
`;

const DetailLogo = styled(FlexGrid)`
  position: absolute;
  transform: translate(0px, -76px);
`;

const TitleBox = styled.div`
  font-size: ${(props) => (props.win ? "28px" : "24px")};
  padding: 8px;
  text-align: center;
  color: ${(props) => (props.win ? props.theme.color.orange : "")};
`;

const DetailBox = styled.div`
  position: absolute;
  transform: ${(props) =>
    props.section ? "translate(-10px, 66px)" : "translate(84px, 66px)"};
  font-size: 12px;
`;

const LoserDetailBox = styled.div`
  position: absolute;
  transform: ${(props) =>
    props.section ? "translate(0px, 66px)" : "translate(90px, 66px)"};
  font-size: 12px;
`;

const Box = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
`;

const DetailImg = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const GrapGauge = styled.div`
  width: ${(props) => props.rate}%;
  height: 6px;

  background-color: ${(props) =>
    props.which ? props.theme.color.orange : "#c4c4c4"};
  display: flex;

  position: absolute;
  bottom: 0;

  ${(props) => (props.which ? "right:0" : "left:0")};
`;

export default Detail;

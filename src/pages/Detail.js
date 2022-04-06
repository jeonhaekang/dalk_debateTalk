import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as alertAction } from "../redux/modules/alert";
import { actionCreators as postAction } from "../redux/modules/post";
import { getCookie } from "../shared/Cookie";

import Header from "../shared/Header";
import Modal from "../components/shared/Modal";
import ShareLink from "../components/shared/ShareLink";
import CommentList from "../components/detail/CommentList";
import CommentWrite from "../components/detail/CommentWrite";
import Board from "../components/detail/Board";

import { ReactComponent as ReportIcon } from "../image/header/report.svg";
import { ReactComponent as SharedIcon } from "../image/header/shared.svg";

import { Text, FlexGrid, Center } from "../elements/Index";

const Detail = (props) => {
  const dispatch = useDispatch();

  const token = getCookie("authorization"); //유저, 토큰 정보

  const boardId = props.match.params.boardId; // 결과창 리스트에 있는 boardId 값
  const data = useSelector((store) => store.post.postData[boardId]);

  const totalCnt =
    parseInt(data?.loserResponse.cnt) + parseInt(data?.winnerResponse.cnt);
  // 투표에 참가한 총 인원수

  // 상세 게시글의 Data 받아오기 ---------------------------------------------------------------------
  useEffect(() => {
    !data && dispatch(postAction.getOnePostDB(boardId));
    dispatch(commentActions.getCommentDB(boardId));
  }, []);

  // 게시글 신고하기 --------------------------------------------------------------------------------
  const handleClickWarning = (e) => {
    if (!token) {
      dispatch(
        alertAction.open({
          message: "로그인이 필요한 서비스입니다",
        })
      );
      return;
    }
    dispatch(postAction.postReportDB(boardId));
  };

  // 공유하기 창 모달 --------------------------------------------------------------------------------
  const [createModalState, setCreateModalState] = useState(false);
  const shareModal = () => {
    setCreateModalState(true);
  };

  return (
    <>
      {data && (
        <>
          <Header page="완료된 토론" meatball boardId={boardId} debate={data}>
            {/* 헤더 미트볼 관련 신고하기 + 공유하기 */}
            <FlexGrid _onClick={handleClickWarning}>
              <ReportIcon />
              <Text marginBottom="3px" color="alert">
                신고하기
              </Text>
            </FlexGrid>
            <FlexGrid _onClick={shareModal}>
              <SharedIcon />
              <Text marginBottom="3px" color="black">
                공유하기
              </Text>
            </FlexGrid>
          </Header>

          <DetailWrap>
            {/* 무승부일때, 승부가 났을 때 두가지 케이스 */}

            <FlexGrid gap="0">
              <Board
                winner
                state={data.winner}
                totalCnt={totalCnt}
                {...data.winnerResponse}
              />
              <Board
                state={data.winner}
                totalCnt={totalCnt}
                {...data.loserResponse}
              />
              <Center>
                <Text size="headline2" weight="black" color="orange">
                  VS
                </Text>
              </Center>
            </FlexGrid>

            {/* 댓글 전체 */}
            <CommentList debate={data} />
            <CommentWrite debate={data} />
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
      )}
    </>
  );
};

const DetailWrap = styled.div`
  height: calc(var(--vh) * 100 - 130px);
  overflow: scroll;
  background-color: #f0f0f0;
`;

export default Detail;

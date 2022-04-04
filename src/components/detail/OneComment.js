import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { history } from "../../redux/configStore";
import { discriminant, rank } from "../../data/rank";
import apis from "../../shared/apis";

import { ReactComponent as Del } from "../../image/comment/delete.svg";
import { ReactComponent as ThumbsUp } from "../../image/comment/thumb_up.svg";
import { ReactComponent as ThumbsDown } from "../../image/comment/thumb_down.svg";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import Grid from "../../elements/Grid";

import { getCookie } from "../../shared/Cookie";
import TimeForToday from "../../shared/TimeForToday";

const OneComment = (props) => {
  //댓글 유저 뱃지
  const userRank = rank[discriminant(props.userInfo.ex, props.userInfo.rank)];

  //삭제 기능을 위해
  const user = useSelector((state) => state.user.user);
  const index = props.index;
  const commentId = props.commentId;

  //찬성 반대 기능 리덕스
  const agreeList = useSelector(
    (state) => state.comment.commentList[index].agreeUserList
  );
  const disagreeList = useSelector(
    (state) => state.comment.commentList[index].disagreeUserList
  );
  const dispatch = useDispatch();

  //찬성, 반대 기능을 위해
  const token = getCookie("authorization");

  const handleClickAgree = () => {
    if (!token) {
      dispatch(
        alertAction.open({
          message: "로그인을 해주세요!",
        })
      );
      history.push("/login");
    }
    dispatch(commentActions.pushAgreeDB(commentId, index));
  };

  const handleClickDisagree = () => {
    if (!token) {
      dispatch(
        alertAction.open({
          message: "로그인을 해주세요!",
        })
      );
      history.push("/login");
    }
    dispatch(commentActions.pushDisAgreeDB(commentId, index));
  };

  //신고 기능

  const handleClickWarning = () => {
    if (!token) {
      dispatch(
        alertAction.open({
          message: "로그인을 해주세요!",
        })
      );
      history.replace("/login");
    } else {
      apis
        .warningComment(commentId)
        .then(() => {
          dispatch(
            alertAction.open({
              type: "confirm",
              message: "정말로 신고하시겠어요?",
            })
          );
        })
        .catch(() => {
          dispatch(
            alertAction.open({
              message: "이미 신고를 하셨습니다",
            })
          );
          return;
        });
    }
  };

  // 코멘트 삭제
  const deleteComment = () => {
    dispatch(commentActions.delCommentDB(commentId));
  };

  return (
    <Container>
      <FlexGrid between>
        <FlexAlign>
          <LevelImg src={userRank.img} />
          <FlexGrid is_column center>
            <Text size="body2" weight="medium" lineHeight="22px">
              {props.userInfo.nickname}
            </Text>
          </FlexGrid>
        </FlexAlign>

        <AgreeBtn>
          <Number className="agree-count" onClick={handleClickAgree}>
            {agreeList.includes(user?.userId) ? (
              <ThumbsUp fill="#f19121" style={{ cursor: "pointer" }} />
            ) : (
              <ThumbsUp fill="#c4c4c4" style={{ cursor: "pointer" }} />
            )}{" "}
            <div
              style={{ margin: "0px 4px", fontWeight: "400", color: "#8E8E8E" }}
            >
              {agreeList.length}
            </div>
          </Number>
          <Number className="disagree-count" onClick={handleClickDisagree}>
            {disagreeList.includes(user?.userId) ? (
              <ThumbsDown fill="#333333" />
            ) : (
              <ThumbsDown fill="#c4c4c4" />
            )}{" "}
            <div
              style={{ marginLeft: "4px", fontWeight: "400", color: "#8E8E8E" }}
            >
              {disagreeList.length}
            </div>
          </Number>
        </AgreeBtn>
      </FlexGrid>

      <Grid padding="4px 0px">
        <Content>{props.comment}</Content>
        <FlexGrid between>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CreatedAt>{TimeForToday(props.createdAt)}</CreatedAt>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0px 0px 2px 10px",
                fontSize: "10px",
                color: "#8E8E8E",
              }}
            >
              |
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Number
                className="warning-count"
                onClick={handleClickWarning}
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  color: "#8E8E8E",
                }}
              >
                {props.warnUserList.includes(user?.userId) ? null : "신고"}
              </Number>
            </div>
          </div>

          {user?.username === props.userInfo.username ? (
            <Del onClick={deleteComment} style={{ cursor: "pointer" }} />
          ) : null}
        </FlexGrid>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  border-top: 4px solid #f0f0f0;
  padding: 10px 16px;
`;

const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`;

const LevelImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

const CreatedAt = styled.div`
  font-size: 8px;
  font-weight: 300;
  color: #8e8e8e;
`;

const Content = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: 16px;
  display: flex;
  padding: 12px 0px;
`;

const Number = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: ${(props) => props.theme.fontWeight.light};
  margin: 0px 6px 0px 0px;
`;

const AgreeBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default OneComment;

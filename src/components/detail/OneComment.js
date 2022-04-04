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
    }
    dispatch(
      alertAction.open({
        type: "confirm",
        message: "덧글을 신고하시겠습니까?",
        action: () => dispatch(commentActions.commentWarnDB(commentId)),
      })
    );
  };

  // 코멘트 삭제
  const deleteComment = () => {
    dispatch(commentActions.delCommentDB(commentId));
  };

  return (
    <Container>
      <FlexGrid between>
        <FlexGrid gap="0">
          <LevelImg src={userRank.img} />
          <Text size="body2" weight="medium" lineHeight="22px">
            {props.userInfo.nickname}
          </Text>
        </FlexGrid>

        <FlexGrid center justifyContent="flex-end">
          <FlexGrid width="auto" _onClick={handleClickAgree} gap="6px">
            <ThumbsUp
              fill={agreeList.includes(user?.userId) ? "#f19121" : "#c4c4c4"}
              style={{ cursor: "pointer" }}
            />
            <Text color="comment" size="body3">
              {agreeList.length}
            </Text>
          </FlexGrid>

          <FlexGrid width="auto" _onClick={handleClickDisagree} gap="6px">
            <ThumbsDown
              fill={disagreeList.includes(user?.userId) ? "#333333" : "#c4c4c4"}
              style={{ cursor: "pointer" }}
            />
            <Text color="comment" size="body3">
              {disagreeList.length}
            </Text>
          </FlexGrid>
        </FlexGrid>
      </FlexGrid>

      <Content>{props.comment}</Content>

      <FlexGrid between>
        <FlexGrid gap="10px" width="auto" center>
          <Text color="comment" size="body3">
            {TimeForToday(props.createdAt)}
          </Text>
          {!props.warnUserList.includes(user?.userId) && (
            <>
              <Text size="body3" color="comment">
                |
              </Text>
              <Text size="body3" color="comment" onClick={handleClickWarning}>
                신고
              </Text>
            </>
          )}
        </FlexGrid>

        {user?.username === props.userInfo.username ? (
          <Del onClick={deleteComment} style={{ cursor: "pointer" }} />
        ) : null}
      </FlexGrid>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  border-top: 4px solid #f0f0f0;
  padding: 10px 16px;
`;

const LevelImg = styled.img`
  width: 25px;
  margin-right: 4px;
`;

const Content = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: 16px;
  padding: 16px 0px;
`;

const Number = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: ${(props) => props.theme.fontWeight.light};
  margin-right: 6px;
`;

export default OneComment;

import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { history } from "../../redux/configStore";
import { discriminant, rank } from "../../data/rank";
import TimeCounting from "time-counting";
import apis from "../../shared/apis";

import Del from "../../image/comment/delete.svg"
import ThumbsUp from "../../image/comment/thumb_up.svg"
import ThumbsUpFill from "../../image/comment/thumb_up_fill.svg"
import ThumbsDown from "../../image/comment/thumb_down.svg"
import ThumbsDownFill from "../../image/comment/thumb_down_fill.svg"

const OneComment = (props) => {
  const userRank = rank[discriminant(props.userInfo.ex)];
  //삭제 기능을 위해
  const boardId = props.boardId;
  const index = props.index;
  const commentId = props.commentId;
  const user = useSelector((state) => state.user.user);
  const agreeList = useSelector(
    (state) => state.comment.commentList[index].agreeUserList
  );
  const disagreeList = useSelector(
    (state) => state.comment.commentList[index].disagreeUserList
  );
  const dispatch = useDispatch();

  //찬성, 반대 기능을 위해
  const token = document.cookie;
  const tokenCheck = token.split("=")[1];

  const handleClickAgree = () => {
    console.log("찬성클릭");
    if (!tokenCheck) {
      dispatch(alertAction.open({
        message: "로그인을 해주세요!"
      }))
      history.push("/login");
    }
    dispatch(commentActions.pushAgreeDB(commentId, index));
  };

  const handleClickDisagree = () => {
    if (!tokenCheck) {
      dispatch(alertAction.open({
        message: "로그인을 해주세요!"
      }))
      history.push("/login");
    }
    dispatch(commentActions.pushDisAgreeDB(commentId, index));
  };

  //신고 기능
  const [isWarn, setIsWarn] = useState(false);

  const handleClickWarning = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tokenCheck) {
      dispatch(alertAction.open({
        message: "로그인을 해주세요!"
      }))
      history.replace("/login");
    }
    if (isWarn === false) {
      await apis
        .warningComment(commentId)
        .then((res) => {
          if (window.confirm("정말 신고하시겠어요?")) {
            console.log("댓글 신고하기 성공", res);
            setIsWarn(true);
            dispatch(alertAction.open({
              message: "신고처리가 완료되었습니다"
            }))
          } else {
            return;
          }
        })
        .catch((err) => {
          console.log("이미 신고한 유저입니다", err);
          dispatch(alertAction.open({
            message: "이미 신고를 하셨습니다"
          }))
          return;
        });
    } else {
      dispatch(alertAction.open({
        message: "이미 신고를 하셨습니다"
      }))
      return;
    }
  };

  // 코멘트 삭제
  const deleteComment = () => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      dispatch(commentActions.delCommentDB(commentId));
    } else {
      return;
    }
  };

  //타임 카운팅
  const option = {
    lang: "ko",
    objectTime: new Date(),
    calculate: {
      justNow: 60
    }
  };

  return (
    <Container>
      <Wrap>
        <FlexAlign>
          <LevelImg src={userRank.img} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <UserName>{props.userInfo.nickname}</UserName>
          </div>
        </FlexAlign>

        <AgreeBtn>
          <Number className="agree-count" onClick={handleClickAgree}>
            {agreeList.includes(user?.userId) ? 
            <img src={ThumbsUpFill} /> : <img src={ThumbsUp} />}{" "}
            <div style={{ marginLeft: "4px", fontWeight:"400", color:"#8E8E8E" }}>
              {agreeList.length}
            </div>
          </Number>
          <Number className="disagree-count" onClick={handleClickDisagree}>
            {disagreeList.includes(user?.userId) ? 
           <img src={ThumbsDownFill} style={{backgroudColor:"#F19121"}}/> : <img src={ThumbsDown} />}{" "}
            <div style={{ marginLeft: "4px", fontWeight:"400", color:"#8E8E8E"}}>
              {disagreeList.length}
            </div>
          </Number>
        </AgreeBtn>
      </Wrap>

      <ContentWrap>
        <Content>{props.comment}</Content>
        <IconBox>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CreatedAt>{TimeCounting(props.createdAt, option)}</CreatedAt>
            <div style={{ display: "flex", alignItems: "center", margin: "0px 0px 2px 10px", fontSize: "10px", color: "#8E8E8E" }}>
              |
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Number
                className="warning-count"
                onClick={handleClickWarning}
                style={{ cursor: "pointer", marginLeft: "10px", color: "#8E8E8E" }}
              >
                {props.warnUserList.includes(user?.userId) ? null : "신고"}
              </Number>
            </div>
          </div>

          {user?.username === props.userInfo.username ? (
            <img onClick={deleteComment} src={Del} style={{ cursor: "pointer" }}></img>
          ) : null}
        </IconBox>
      </ContentWrap>
    </Container>
  );
};
const Container = styled.div`
  background-color: #fff;
  border-top: 4px solid #F0F0F0;
`
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 3px solid #fff;
  padding: 10px 0px;
`;
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`;
const LevelImg = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  margin: 0px 4px 0px 16px;
`;
const UserName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
`;
const CreatedAt = styled.div`
  font-size: 8px;
  font-weight: 300;
  color: #8E8E8E;
`;
const ContentWrap = styled.div`
  border-bottom: 3px solid #fff;
  padding: 4px 18px;
`;
const Content = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body1}
  font-weight: ${(props) => props.theme.fontWeight.regular}
  line-height: 16px;
  display: flex;
  align-items: center;
  padding: 0 0 16px;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Number = styled.p`
  display: flex;
  font-size: 12px;
  font-weight: 300;
  margin: 0px 10px 0px 0px;
`;
const AgreeBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 10px;
`;

export default OneComment;

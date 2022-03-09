import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as commentActions } from '../../redux/modules/comment'
import { history } from '../../redux/configStore'

import star from '../../image/star.png'
import apis from '../../shared/apis'

const OneComment = (props) => {
  //삭제 기능을 위해
  const boardId = props.boardId;
  const index = props.index;
  const commentId = props.commentId;
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  //찬성, 반대 기능을 위해
  const token = document.cookie;
  const tokenCheck = token.split("=")[1];

  const handleClickAgree = () => {
    if(!tokenCheck){
      alert("로그인을 해주세요!")
      history.replace("/login")
    }
    dispatch(commentActions.pushAgreeDB(commentId))
  }

  const handleClickDisagree = () => {
    if(!tokenCheck){
      alert("로그인을 해주세요!")
      history.replace("/login")
    }
    dispatch(commentActions.pushDisAgreeDB(commentId))
  }

  //신고 기능
  const [isWarn, setIsWarn] = useState(false);

  const handleClickWarning = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!tokenCheck) {
      alert("로그인을 해주세요!")
      history.replace('/login')
    }
    if (isWarn === false) {
      await apis
        .warningComment(commentId)
        .then((res) => {
          console.log('댓글 신고하기 성공', res)
          setIsWarn(true);
          alert("신고가 접수되었습니다")
        })
        .catch((err) => {
          console.log('댓글 신고하기 에러', err)
        })
    }else{
      alert("이미 신고를 하셨습니다")
      return;
    }
  }


  // 코멘트 삭제
  const deleteComment = () => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      dispatch(commentActions.delCommentDB(commentId));
    } else {
      return;
    }
  }


  return (

    <>
      <Wrap>
        <FlexAlign>
          <LevelImg src={star} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <UserName>{props.userInfo.nickname}</UserName>
            <CreatedAt>2022-03-01</CreatedAt>
          </div>
        </FlexAlign>
        <AgreeBtn>
          {/* <Number className="agree-count" onClick={handleClickAgree}>{(agreeAction === false) ? "찬성" : "찬성취소"} {agreeCnt}</Number> */}
          <Number className="agree-count" onClick={handleClickAgree}>
            {(props.agreeUserList?.includes(user.id)) ? "찬성취소" : "찬성"} {props.agreeUserList?.length}
          </Number>
          {/* <Number className="disagree-count" onClick={handleClickDisagree}>{(disagreeAction === false) ? "반대" : "반대취소"} {disagreeCnt}</Number> */}
          <Number className="disagree-count" onClick={handleClickDisagree}>
            {(props.disagreeUserList?.includes(user.id)) ? "반대취소" : "반대"} {props.disagreeUserList?.length}
          </Number>
        </AgreeBtn>
      </Wrap>
      <ContentWrap>
        <Content>{props.comment}</Content>
        <IconBox>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number className="warning-count" 
            onClick={handleClickWarning}
            style={{ cursor: "pointer" }} >{(props.warnUserList?.includes(user.id)) ? "신고햇음" : "신고"}</Number>
          </div>

          {user?.username === props.userInfo.username ? <button onClick={deleteComment}>삭제</button> : null}
        </IconBox>
      </ContentWrap>
    </>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e5e5e5;
  border-top: 2px solid #fff;
  padding: 10px 0px;
`
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`
const LevelImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin:0 12px 0 20px ;
`
const UserName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
`
const CreatedAt = styled.div`
  font-size: 8px;
  font-weight: 300;
`
const ContentWrap = styled.div`
  border-bottom: 3px solid #fff;
  padding: 16px 20px;
`
const Content = styled.div`
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  padding: 0 0 20px;
`
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Number = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin: 0px 10px 0px 0px;
`
const NumberDisabled = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin: 0px 10px 0px 0px;
`

const AgreeBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 10px;
`

export default OneComment;
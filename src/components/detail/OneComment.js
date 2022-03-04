import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../../redux/modules/comment'
import { history } from '../../redux/configStore'

import star from '../../image/star.png'
import apis from '../../shared/apis'

const OneComment = (props) => {
  const [isLiked, setIsLiked] = useState(props.isLike)
  const [likeCnt, setLikeCnt] = useState(props.likeCnt)

  const dispatch = useDispatch()

  //찬성 기능
  // const token = document.cookie;
  // const tokenCheck = token.split("=")[1]
  // const handleClickLike = async (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   if (!tokenCheck) {
  //     alert("로그인을 해주세요!")
  //     history.replace('/login')
  //   }
  //   if (isLiked) {
  //     await apis
  //       .likeComment(commentId)
  //       .then((res) => {
  //         setIsLiked(false)
  //         setLikeCnt(likeCnt - 1)
  //       })
  //       .catch((err) => {
  //         console.log('좋아요 취소 에러', err)
  //       })
  //   } else {
  //     await apis
  //       .likeComment(commentId)
  //       .then((res) => {
  //         setIsLiked(true)
  //         setLikeCnt(likeCnt + 1)
  //       })
  //       .catch((err) => {
  //         console.log('좋아요 에러', err)
  //       })
  //   }
  // }

  //반대 기능

  //신고 기능

  // 코멘트 삭제
  const delComment = () => {
    // dispatch(commentActions.delCommentDB(boardId, commentId))
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
      </Wrap>
      <ContentWrap>
        <Content>{props.comment}</Content>
        <IconBox>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number className="like-count">찬성 {props.likeCnt}</Number>
            <Number className="like-count">반대 {props.likeCnt}</Number>
          </div>
            <button onClick={delComment}>삭제</button>
        </IconBox>
      </ContentWrap>
    </>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e5e5e5;
  border-top: 2px solid #e5e5e5;
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
  border-bottom: 10px solid #e5e5e5;
  padding: 16px 20px;
`
const Content = styled.div`
  font-size: 10px;
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
  font-size: 10px;
  font-weight: 300;
  margin: 0 0 0 5px;
`

export default OneComment;
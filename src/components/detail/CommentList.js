import React, { useState } from 'react'
import styled from 'styled-components'
import { history } from '../../redux/configStore'
import { actionCreators as commentActions } from '../../redux/modules/comment'
import OneComment from './OneComment'

import Button from '../../elements/Button'

import { useDispatch, useSelector } from 'react-redux'

const CommentList = ({ debate }) => {
  const boardId = debate.boardId;

  const dispatch = useDispatch();

  const commentList = useSelector((state) => state.comment.commentList);
  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value)
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      addComment();
    }
  }

  const token = document.cookie;
  const tokenCheck = token.split("=")[1]
  const addComment = () => {
    if (!tokenCheck) {
      alert("로그인 해주세요!")
      history.replace('/login');
    } else {
      dispatch(commentActions.addCommentDB(boardId, comment))
      setComment("");
    }
  }

  return (
    <>
      {commentList.map((c, idx) => {
        return <OneComment index={idx} {...c} key={idx} boardId={boardId} />
      })}

      <CommentWriteContainer>
        <ImgInput>
          <input className='writebox'
            placeholder="이 토론에 대한 의견을 작성해주세요"
            type="text"
            value={comment}
            onChange={onChangeComment}
            onKeyDown={onKeyDown}
          ></input>
        </ImgInput>
        <Button onClick={addComment}>아이콘</Button>
      </CommentWriteContainer>
    </>
  )
};

const CommentWriteContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  background: #fcfcfc;
`
const ImgInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .writebox {
    border: none;
    font-size: 16px;
    padding: 0 20px 0 0;
    width: calc(100% - 30px);
    &::placeholder {
      color: gray
    }
  }
`
export default CommentList;